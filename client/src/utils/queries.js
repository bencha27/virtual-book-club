import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      username
      email
      password
      posts
    }
  }
`;

export const QUERY_POSTS = gql`
  query allPosts {
    allPosts {
      _id
      user {
        _id
        username
      }
      postTitle
      postBody
      createdAt
    }
  }
`;

export const QUERY_SINGLE_POST = gql`
  query singlePost($postId: ID!) {
    post(postId: $postId) {
      _id
      user {
        _id
        username
      }
      postTitle
      postBody
      createdAt
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      email
      password
      posts {
        _id
        postTitle
        postBody
        createdAt
        user {
          _id
          username
        }
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      posts {
        _id
        postTitle
        postBody
        createdAt
        user {
          _id
          username
        }
      }
    }
  }
`;