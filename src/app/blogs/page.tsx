'use client';
// import { posts } from "@/data/posts";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import prisma from "../../../lib/db";
import { Post } from "@/types/blog";

const BlogPage =  () => {
  
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/api/posts`);
        if (res.status === 200) {
          setPosts(res.data);
          console.log("POSTS ", res.data);
          
        } else {
          console.error("ERROR ", res.statusText);
        }
      } catch (error) {
        console.error("ERROR ", error);
      }
    };

    fetchPosts();
  }, []);
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">BLOGS</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blogs/${post.id}`}
            className="bg-white rounded-md p-4 shadow-sm"
          >
            <h2 className="text-xl text-black font-bold">{post.title}</h2>
            <p className="text-gray-600">By {post.user?.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
