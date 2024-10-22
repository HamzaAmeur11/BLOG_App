import { posts } from "@/data/posts"
import Link from "next/link"

const BlogPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">BLOGS</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
                <Link key={post.id} href={`/blogs/${post.id}`} className="bg-white rounded-md p-4 shadow-sm">
                        <h2 className="text-xl text-black font-bold">{post.title}</h2>
                        <p className="text-gray-600">By {post.username}</p>
                    </Link>
            ))}
        </div>
    </div>
  )
}

export default BlogPage