const { User, Post } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  // Queries (Find)
  Query: {
    // Find all
    // Find all users, populate associated books and posts
    allUsers: async () => {
      return await User.find().populate("posts");
    },
    // Find all posts
    allPosts: async () => {
      return await Post.find().populate("user");
    },

    // Find one
    // Find a user by ID
    user: async (parent, { userId }) => {
      return await User.findById({ _id: userId }).populate("posts").populate("posts");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findById({ _id: context.user._id }).populate("posts");
      }
      throw new AuthenticationError("You need to be logged in");
    },
    // Find a post by ID
    post: async (parent, { postId }) => {
      return await Post.findById({ _id: postId }).populate("user");
    },
  },

  // Mutations (Add, Update, Delete)
  Mutation: {
    // User
    createUser: async (parent, { email, username, password }) => {
      const user = await User.create({ email, username, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError("Incorrect login");
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect login");
      }

      const token = signToken(user);
      return { token, user };
    },
    deleteUser: async (parent, { userId }, context) => {
      if (context.user) {
        const userToDelete = await User.findById({ _id: userId });
        await Post.deleteMany({ _id: { $in: userToDelete.posts }});
        return await User.findOneAndDelete({ _id: userId });
      }
      throw new AuthenticationError("You need to be logged in");
    },

    // Post
    createPost: async (parent, { userId, postTitle, postBody }, context) => {
      if (context.user) {
        const newPost = await Post.create({ user: userId, postTitle, postBody });
        await User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { posts: newPost._id }},
          { new: true, runValidators: true },
        );
        return newPost;
      }
      throw new AuthenticationError("You need to be logged in");
    },
    deletePost: async (parent, { postId }, context) => {
      if (context.user) {
        const postToDelete = await Post.findById({ _id: postId });
        await User.findOneAndUpdate(
          { _id: postId.user },
          { $pull: { posts: { _id: postId }}},
        );
        return await Post.findOneAndDelete({ _id: postId });
      }
      throw new AuthenticationError("You need to be logged in");
    },
  }
};

module.exports = resolvers;