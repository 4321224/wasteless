import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query Query {
    getAllCategories {
      _id
      name
      price
    }
  }
`;

export const GET_CATEGORY_ID = gql`
  query GetCategoryById($categoryId: ID) {
    getCategoryById(category_id: $categoryId) {
      _id
      name
      price
    }
  }
`;
