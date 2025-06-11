import Link from 'next/link';
import Blog from './_components/Blog';
import { Suspense } from 'react';
import { connectToDatabase } from '../../lib/mongo'; // ADDED: For direct DB access

// Helper function to fetch blogs directly from MongoDB
async function getBlogsDirectly() {
  try {
    const db = await connectToDatabase();
    const blogsFromDB = await db.collection('blogs').find({}).toArray();
    // Map to the structure expected by the component (similar to your GraphQL resolver)
    return blogsFromDB.map(blog => ({
      ...blog, // Spread original blog data
      id: blog._id.toString(), // Ensure 'id' is the string representation of '_id'
      // If your Blog component or other logic relies on _id as a string, ensure it's mapped:
      // _id: blog._id.toString(), 
      createdAt: blog.createdAt ? new Date(blog.createdAt).toISOString() : null, // Ensure createdAt is a string
    }));
  } catch (dbError) {
    console.error("Error fetching blogs directly from DB:", dbError);
    // Return an object indicating an error, or throw the error
    // to be caught by Next.js error handling or an ErrorBoundary
    return { error: true, message: dbError.message };
  }
}

async function BlogPosts() {
  const blogsOrError = await getBlogsDirectly();

  if (blogsOrError.error) {
    return <p>Error loading blogs: {blogsOrError.message}</p>;
  }

  const blogs = blogsOrError;

  // The explicit loading state (if (loading) return <p>Loading...</p>;)
  // is handled by the <Suspense> boundary in BlogListPage when using direct async/await
  // in Server Components.

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

