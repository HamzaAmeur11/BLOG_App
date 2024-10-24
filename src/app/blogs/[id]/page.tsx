"use client";
import Comments from "@/components/Comments";
import FormComments from "@/components/FormComments";
import EditPostModal from "@/components/EditPostModal";
import { Post } from "@/types/blog";
import { Comment } from "@prisma/client";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { format } from "date-fns";
import Image from "next/image";
import { log } from "util";
import DeletePostModal from "@/components/DeletePostModal";

interface BlogDetailsPageProps {
  params: {
    id: string;
  };
}

const BlogDetailsPage: FC<BlogDetailsPageProps> = ({ params }) => {
  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/api/posts?id=${params.id}`);
        if (res.status === 200) {
          setPost(res.data);
          console.log("post: ", res.data);
          setComments(res.data.comments);
        } else {
          console.error("ERROR ", res.statusText);
        }
      } catch (error) {
        console.error("ERROR ", error);
      }
    };

    fetchPosts();
  }, [params.id]);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };
  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const handleUpdatePost = (updatedPost: Post) => {
    setPost(updatedPost);
  };

  return (
    <main className="">
      {/* <h1 className="text-3xl font-bold mb-4">Blog Details</h1> */}
      <div className="container mx-auto px-5 md:px-0 w-full md:w-10/12 lg:w-5/12 font-work ">
        <div className="py-5">

          <h2 className="text-base-content font-semibold text-xl md:text-2xl lg:text-4xl leading-5 md:leading-10 text-gray-900">
            {post?.title}
          </h2>


          <div className="mt-3 md:mt-6 flex items-center gap-5 text-base-content/60">
            <Image
              className="rounded-full w-9"
              src={post?.user.image}
              alt=""
              width={40}
              height={40}
            />
            <p className="text-gray-600 text-xs md:text-sm font-medium hover:text-primary transition hover:duration-300">
              By {post?.user.name}
            </p>
            <p className="text-gray-500 text-xs md:text-sm">
              {post?.createdAt ? format(post.createdAt, "MMM d, yyyy") : ""}
            </p>
          </div>
          <div className="flex justify-between items-center mb-6">
        <button onClick={handleEditClick} className=" custom-button bg-blue-500 mt-4">
          Edit Post
        </button>
        <button onClick={handleDeleteClick} className="custom-button mt-4 bg-red-500">
          Delete Post
        </button>
          </div>


        </div>
        <Image
          className="rounded-t-lg mt-8"
          src={"/img.jpeg"}
          alt=""
          width={500}
          height={300}
        />
        <div className="mt-8">
          <p className="text-gray-800 text-xl leading-8 text-base-content/80">
            {post?.content}
          </p>
        </div>
      </div>
      <Comments comments={comments} />
      <FormComments
        postId={params.id}
        onNewComment={(newComment) => setComments([...comments, newComment])}
      />
      {isEditModalOpen && post && (
        <EditPostModal
          post={post}
          onClose={handleCloseModal}
          onUpdate={handleUpdatePost}
        />
      )}
      {isDeleteModalOpen && post && 
        <DeletePostModal 
        
        show={isDeleteModalOpen}
        post={post}
        onClose={handleCloseModal}/>
      }
    </main>
  );
};

export default BlogDetailsPage;
