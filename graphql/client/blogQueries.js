// graphql/client/blogQueries.js
import { gql } from '@apollo/client';

export const GET_BLOGS = gql`
  query GetBlogs {
    blogs {
      id
      title
      content
      createdAt
    }
  }
`;

export const GET_BLOG_BY_ID = gql`
  query GetBlogById($id: ID!) {
    blog(id: $id) {
      id
      title
      content
      createdAt
    }
  }
`;
