import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($email: String!, $username: String!, $password: String!) {
    createUser(email: $email, username: $username, password: $password) {
      token
      user{
      _id
      username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      _id
      username
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($userId: ID!, $postTitle: String!, $postBody: String!) {
    createPost(userId: $userId, postTitle: $postTitle, postBody: $postBody) {
      _id
      user {
        _id
        username
      }
      postTitle
      postBody
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) {
      _id
      postTitle
    }
  }
`;