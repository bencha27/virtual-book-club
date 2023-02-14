const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # Custom types
  type User {
    _id: ID
    username: String
    email: String
    password: String
    books: [Book]
    posts: [Post]
  }

  type Book {
    _id: ID
    title: String
    author: String
    posts: [Post]
  }

  type Post {
    _id: ID
    user: User
    book: Book
    chapter: String
    postText: String
  }

  # Built-in types
  type Query {
    # All
    users: [User]
    books: [Book]
    posts: [Post]

    # One
    user(userId: ID!): User
    book(bookId: ID!): Book
    post(postId: ID!): Post
  }

  type Mutation {
    # User
    addUser(username: String!, email: String!, password: String!): User
    deleteUser(userId: ID!): User
    saveBookToUser(userId: ID!, bookId: ID!): User

    # Book
    addBook(title: String!, author: String): Book
    updateBook(bookId: ID!, title: String, author: String): Book
    deleteBook(bookId: ID!): Book

    # Post
    addPost(userId: ID!, bookId: ID!, chapter: String, postText: String!): Post
    # updatePost(postId: ID! postText: String, chapter: String): Post
    deletePost(postId: ID!): Post
  }
`;

module.exports = typeDefs;