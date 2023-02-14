const { User, Book, Post } = require("../models");

const resolvers = {
  // Queries (Find)
  Query: {
    // Find all
    // Find all users, populate associated books and posts
    users: async () => {
      return await User.find({}).populate("books")
        .populate({ path: "books", populate: "posts" })
        .populate("posts");
    },
    // Find all books
    books: async () => {
      return await Book.find({}).populate("posts");
    },
    // Find all posts
    posts: async () => {
      return await Post.find({}).populate("book").populate("user");
    },

    // Find one
    // Find a user by ID
    user: async (parent, { userId }) => {
      return await User.findById({ _id: userId }).populate("books")
        .populate({ path: "books", populate: "posts" })
        .populate("posts");
    },
    // Find a book by ID
    book: async (parent, { bookId }) => {
      return await Book.findById({ _id: bookId }).populate("posts");
    },
    // Find a post by ID
    post: async (parent, { postId }) => {
      return await Post.findById({ _id: postId }).populate("book").populate("user");
    },
  },

  // Mutations (Add, Update, Delete)
  Mutation: {
    // User
    addUser: async (parent, { username, email, password }) => {
      return await User.create({ username, email, password });
    },
    deleteUser: async (parent, { userId }) => {
      const deletedUser = await User.findOneAndDelete({ _id: userId });
      return await Post.deleteMany({ _id: { $in: deletedUser.posts }});
    },
    saveBookToUser: async (parent, { userId, bookId }) => {
      await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { books: bookId }},
        { new: true },
      );
    },

    // Book
    addBook: async (parent, { title, author }) => {
      return await Book.create({ title, author });
    },
    updateBook: async (parent, { bookId, title, author }) => {
      if (!title) {
        return await Book.findOneAndUpdate(
          { _id: bookId },
          { $set: { author: author } },
          { new: true },
        );
      } else if (!author) {
        return await Book.findOneAndUpdate(
          { _id: bookId },
          { $set: { title: title } },
          { new: true },
        );
      } else {
        return await Book.findOneAndUpdate(
          { _id: bookId },
          { $set: { title: title, author: author } },
          { new: true },
        );
      }
    },
    deleteBook: async (parent, { bookId }) => {
      const deletedBook = await Book.findOneAndDelete({ _id: bookId });
      await User.findOneAndUpdate(
        { books: bookId },
        { $pull: { books: bookId }},
        { new: true },
      );
      const postsToDelete = await Post.find({ book: bookId });
      for (let i = 0; i < postsToDelete.length; i++) {
        await User.findOneAndUpdate(
          { _id: postsToDelete[i].user },
          { $pull: { posts: postsToDelete[i]._id }},
          { new: true },
        );
      }
      await Post.deleteMany({ book: bookId });
    },

    // Post
    addPost: async (parent, { userId, bookId, chapter, postText }) => {
      const newPost = await Post.create({ user: userId, book: bookId, chapter, postText });
      await Book.findOneAndUpdate(
        { _id: bookId },
        { $addToSet: { posts: newPost._id }},
        { new: true },
      );
      await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { posts: newPost._id }},
        { new: true },
      );
      return newPost;
    },
    deletePost: async (parent, { postId }) => {
      return await Post.findOneAndDelete({ _id: postId });
    },
  }
};

module.exports = resolvers;