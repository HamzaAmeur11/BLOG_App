'use client';

import Comments from "@/components/Comments";
import FormComments from "@/components/FormComments";
import { Post } from "@/types/blog";
import { Comment } from "@prisma/client";
// import { Comment } from "@/types/blog";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";

interface BlogDetailsPageProps {
  params: {
    id: string
  }
}

const BlogDetailsPage :FC<BlogDetailsPageProps> = ({ params }) => {
  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);
  console.log();
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/api/posts?id=${params.id}`);
        if (res.status === 200) {
          setPost(res.data);
          setComments(res.data.comments);
          console.log("POSTS ", res.data);
          
        } else {
          console.error("ERROR ", res.statusText);
        }
      } catch (error) {
        console.error("ERROR ", error);
      }
    };

    fetchPosts();
  }, [params.id]);

  const handleNewComment = (newComment: Comment) => {
    console.log("NEW COMMENT ", newComment);
    
    setComments((prevComments) => [...prevComments, newComment]);
  };


  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Blog Details</h1>
      <div className="bg-white rounded-md p-4 shadow-sm">
        <h2 className="text-xl text-black font-bold">{post?.title}</h2>
        <p className="text-gray-600">By {post?.user.name}</p>
        <p className="text-gray-800">{post?.content}</p>
      </div>
      <Comments  comments={comments}/>
      <FormComments postId={params.id} handleSubmit={handleNewComment}/>
    </div>
  );
};

export default BlogDetailsPage;
