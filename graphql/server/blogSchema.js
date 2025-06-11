// /graphql/server/blogSchema.js
import gql from "graphql-tag";
import { connectToDatabase } from "../../lib/mongo";
import { ObjectId } from 'mongodb'; // Import ObjectId
// Define the Blog GraphQL schema
// Define GraphQL Schema for Blog
export const typeDefs = gql`
  type Blog {
    id: ID!
    title: String!
    content: String!
    createdAt: String!
  }

  type Query {
    blogs: [Blog]!
    blog(id: ID!): Blog
  }

  type Mutation {
    createBlog(title: String!, content: String!): Blog
  }
`;

// Resolvers for the queries and mutations
export const resolvers = {
  Query: {
    blogs: async () => {
      const db = await connectToDatabase();
      const collections = await db.listCollections().toArray();
      const blogDocuments = await db.collection("blogs").find({}).toArray(); // Changed 'test' to 'blogs'
      const blogsToReturn = blogDocuments.map((blog) => ({
        ...blog,
        id: blog._id.toString(),
        createdAt:
          blog.createdAt instanceof Date
            ? blog.createdAt.toISOString()
            : blog.createdAt,
      }));
      console.log(
        "Blogs to return with mapped id and createdAt:",
        blogsToReturn
      );
      return blogsToReturn;
    },
    blog: async (_, { id: blogId }) => {
      const db = await connectToDatabase();
      console.log(`Attempting to fetch blog with id (string): ${blogId}`);

      let mongoIdToSearch;
      try {
        mongoIdToSearch = new ObjectId(blogId); // Convert string ID to ObjectId
        console.log(`Converted to ObjectId: ${mongoIdToSearch}`);
      } catch (error) {
        console.error("Invalid ID format, cannot convert to ObjectId:", blogId, error);
        return null; // If ID is not a valid ObjectId format, it won't match.
      }

      const blogDocument = await db
        .collection("blogs")
        .findOne({ _id: mongoIdToSearch }); // Query using the ObjectId
      console.log("Fetched single blog document with ObjectId query:", blogDocument);
      if (!blogDocument) {
        return null;
      }
      return {
        ...blogDocument,
        id: blogDocument._id.toString(),
        createdAt:
          blogDocument.createdAt instanceof Date
            ? blogDocument.createdAt.toISOString()
            : blogDocument.createdAt,
      };
    },
  },
  Mutation: {
    createBlog: async (_, { title, content }) => {
      const db = await connectToDatabase();
      const newBlogDocument = { title, content, createdAt: new Date() };
      const result = await db.collection("blogs").insertOne(newBlogDocument);
      if (!result.insertedId) {
        throw new Error("Failed to insert blog");
      }
      return {
        // Spread original document which has Date object for createdAt
        // but then override with string versions for GraphQL response
        ...newBlogDocument,
        id: result.insertedId.toString(),
        createdAt: newBlogDocument.createdAt.toISOString(), // Ensure createdAt is string
      };
    },
  },
};
