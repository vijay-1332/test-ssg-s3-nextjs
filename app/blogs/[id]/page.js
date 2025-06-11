// app/blogs/[id]/page.js
import { notFound } from 'next/navigation';
import createApolloClient from '../../../lib/apolloClient';
import { GET_BLOG_BY_ID } from '../../../graphql/client/blogQueries'; // Removed GET_BLOGS as it was only for generateStaticParams
import BlogDetail from './_components/BlogeDetail'; // Corrected component name assuming it's BlogDetail.js
import { Suspense } from 'react';

// Removed generateStaticParams function to make the page fully dynamic

async function BlogPostData({ id }) {
  const client = createApolloClient();
  const { data, loading, error } = await client.query({
    query: GET_BLOG_BY_ID,
    variables: { id },
  });

  if (loading) return <p>Loading blog post...</p>;
  // Error handling: if error or no data, trigger notFound
  // This is important for generateStaticParams, as it expects pages to exist or return 404
  if (error || !data || !data.blog) {
    console.error('Error fetching blog by ID:', error ? error.message : 'Blog not found');
    notFound();
  }

  return <BlogDetail blog={data.blog} />;
}

export default async function BlogPostPage({ params }) {
  const { id } =await params;

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<p>Loading blog post...</p>}>
        <BlogPostData id={id} />
      </Suspense>
    </div>
  );
}