"use client";
// import { posts } from "@/data/posts";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import prisma from "../../../lib/db";
import { Post } from "@/types/blog";
import Image from "next/image";

const BlogPage = () => {
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
          <div
            key={post.id}
            className="shadow-md bg-gray-300 border border-gray-400 rounded-lg max-w-sm mb-5"
          >
            <Link href={`/blogs/${post.id}`}>
              <Image
                className="rounded-t-lg"
                src={"/img.jpeg"}
                alt=""
                width={500}
                height={300}
              />
            </Link>
            <div className="p-5 ">
              <h2 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 truncate">
                {post.title}
              </h2>
              <p className="text-gray-600">By {post.user?.name}</p>
              <p className="text-gray-900 font-bold tracking-tight mb-2 truncate">
                {post.content}
              </p>
              <Link
                href={`/blogs/${post.id}`}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
