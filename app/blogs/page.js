import Link from 'next/link';
import Blog from './_components/Blog';
import createApolloClient from '../../lib/apolloClient'; // Import Apollo Client
import { GET_BLOGS } from '../../graphql/client/blogQueries'; // Import GET_BLOGS query
import { Suspense } from 'react';

async function BlogPosts() {
  // Create a new Apollo Client instance for each server-side request
  // This is important for preventing data leakage between users or requests
  const client = createApolloClient();

  // Fetching data from your GraphQL API
  const { data, loading, error } = await client.query({
    query: GET_BLOGS,
  });

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p>Error loading blogs: {error.message}</p>;

  const blogs = data.blogs;

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))
      ) : (
        <p>No blogs found.</p>
      )}
    </ul>
  );
}

export default async function BlogListPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6">Blog List</h1>
            <Suspense fallback={<p>Loading blogs...</p>}>
              <BlogPosts />
            </Suspense>
        </div>
    )
}

