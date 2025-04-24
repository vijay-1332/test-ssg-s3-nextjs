// app/blogs/[id]/page.js
import BlogDetail from './_components/BlogeDetail';

export async function generateStaticParams() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();
  return posts.slice(0, 5).map((post) => ({
    id: post.id.toString(),
  }));
}

async function BlogPost({ params }) {
  const awaitedParams = await params; // Await the params object
  const { id } = awaitedParams;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const blog = await res.json();
  console.log(blog, 'blog');
  if (!blog) {
    notFound(); // Import { notFound } from 'next/navigation'
  }

  return <BlogDetail blog={blog} />;
}

export default BlogPost;