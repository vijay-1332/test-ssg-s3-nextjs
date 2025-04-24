'use client'
import Link from "next/link"
export default function BlogDetail({ blog }) {
    return (
        <li
            key={blog?.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {blog?.title||'title'}
            </h2>
            <p className="text-gray-600 mb-4">{blog?.body||'no data found'}...</p>
            <Link
                href={`/blogs`}
                className="text-blue-500 hover:text-blue-600 font-medium"
            >
               Back
            </Link>
        </li>
    )
}