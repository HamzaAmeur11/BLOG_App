import React, { FC } from "react";
import axios from "axios";
import { Post } from "@prisma/client";
import { useRouter } from "next/navigation";
// import { Modal, Button } from 'react-bootstrap';

interface DeletePostModalProps {
  show: boolean;
  post: Post;
  onClose: () => void;
}

const DeletePostModal: FC<DeletePostModalProps> = ({
  show,
  post,
  onClose,
}) => {
    const router = useRouter()
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/posts/${post.id}`);
      if (res.status === 200) {
        router.replace('/blogs')
      } else {
        console.error("ERROR ", res.statusText);
      }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            console.error("Post not found");
          } else {
            console.error("ERROR ", error);
          }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className=" bg-white p-4 items-center justify-center rounded-md shadow-md w-1/2">
      <h2 className="text-xl text-gray-800  font-bold mb-4">DELETE Post</h2>
        <div className="flex justify-end" >

      <button onClick={onClose} className="custom-button bg-gray-500 mr-2">
        Cancel
      </button>
      <button onClick={handleDelete} className="custom-button bg-red-500">
        Delete
      </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePostModal;
