const { User, Post } = require("../models");

const resolvers = {
  // Queries (Find)
  Query: {
    // Find all
    // Find all users, populate associated books and posts
    users: async () => {
      return await User.find({}).populate("posts");
    },
    // Find all posts
    posts: async () => {
      return await Post.find({}).populate("user");
    },

    // Find one
    // Find a user by ID
    user: async (parent, { userId }) => {
      return await User.findById({ _id: userId }).populate("posts");
    },
    // Find a post by ID
    post: async (parent, { postId }) => {
      return await Post.findById({ _id: postId }).populate("user");
    },
  },

  // Mutations (Add, Update, Delete)
  Mutation: {
    // User
    createUser: async (parent, { username, email, password }) => {
      return await User.create({ username, email, password });
    },
    deleteUser: async (parent, { userId }) => {
      const userToDelete = await User.findById({ _id: userId });
      await Post.deleteMany({ _id: { $in: userToDelete.posts }});
      return await User.findOneAndDelete({ _id: userId });
    },

    // Post
    createPost: async (parent, { userId, postTitle, postBody }) => {
      const newPost = await Post.create({ user: userId, postTitle, postBody });
      await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { posts: newPost._id }},
        { new: true },
      );
      return newPost;
    },
    deletePost: async (parent, { postId }) => {
      const postToDelete = await Post.findById({ _id: postId });
      await User.findOneAndUpdate(
        { _id: postId.user },
        { $pull: { posts: { _id: postId }}},
      );
      return await Post.findOneAndDelete({ _id: postId });
    },
  }
};

module.exports = resolvers;