const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # Custom types
  type User {
    _id: ID
    username: String
    email: String
    password: String
    posts: [Post]
  }

  type Post {
    _id: ID
    user: User
    postTitle: String
    postBody: String
  }

  # Built-in types
  type Query {
    # All
    users: [User]
    posts: [Post]

    # One
    user(userId: ID!): User
    post(postId: ID!): Post
  }

  type Mutation {
    # User
    createUser(username: String!, email: String!, password: String!): User
    deleteUser(userId: ID!): User

    # Post
    createPost(userId: ID!, postTitle: String!, postBody: String!): Post
    deletePost(postId: ID!): Post
  }
`;

module.exports = typeDefs;