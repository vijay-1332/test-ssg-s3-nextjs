import Link from 'next/link';
import Blog from './_components/Blog';
export default async function BlogList() {
    // Fetching data from the API
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const blogs = await res.json();


    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6">Blog List</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.slice(0, 5).map((blog) => (
                    <Blog key={blog.id} blog={blog} />
                ))}
            </ul>
        </div>
    )
}

