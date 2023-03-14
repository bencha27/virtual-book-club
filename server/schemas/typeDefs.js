const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # Custom types
  type User {
    _id: ID
    email: String
    username: String
    password: String
    posts: [Post]
  }

  type Post {
    _id: ID
    user: User
    postTitle: String
    postBody: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  # Built-in types
  type Query {
    # All
    allUsers: [User]
    allPosts: [Post]

    # One
    user(userId: ID!): User
    me: User
    post(postId: ID!): Post
  }

  type Mutation {
    # User
    createUser(email: String!, username: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    deleteUser(userId: ID!): User

    # Post
    createPost(userId: ID!, postTitle: String!, postBody: String!): Post
    deletePost(postId: ID!): Post
  }
`;

module.exports = typeDefs;