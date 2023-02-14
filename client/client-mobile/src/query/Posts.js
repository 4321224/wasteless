import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetAllPost {
    getAllPosts {
      _id
      giver_id
      taker_id
      category_id
      title
      description
      mainImage
      quantity
      lat
      long
      status
    }
  }
`;

export const GET_POST_DETAIL = gql`
  query GetPostById($postId: ID) {
    getPostById(post_id: $postId) {
      _id
      giver_id
      taker_id
      category_id
      title
      description
      mainImage
      quantity
      lat
      long
      status
    }
  }
`;

export const POST_POST = gql`
  mutation Mutation($postPayload: postPayload) {
    addPost(postPayload: $postPayload) {
      message
      error
      access_token
    }
  }
`;

export const DELETE_POST = gql`
  mutation Mutation($postId: ID) {
    deletePost(post_id: $postId) {
      error
      access_token
      message
    }
  }
`;

export const EDIT_POST = gql`
  mutation Mutation($postPayload: postPayload, $postId: ID) {
    editPost(postPayload: $postPayload, post_id: $postId) {
      access_token
      error
      message
    }
  }
`;

export const GET_POST_BY_CATEGORY = gql`
  query GetPostByCategory($categoryId: String) {
    getPostByCategory(category_id: $categoryId) {
      _id
      giver_id
      taker_id
      category_id
      title
      description
      mainImage
      quantity
      lat
      long
      status
    }
  }
`;
