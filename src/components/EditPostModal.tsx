import React, { FC, useState } from "react";
import axios from "axios";
import { Post } from "@prisma/client";

interface EditPostModalProps {
  post: Post;
  onClose: () => void;
  onUpdate: (updatedPost: Post) => void;
}

const EditPostModal: FC<EditPostModalProps> = ({ post, onClose, onUpdate }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content || "");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.put(`/api/posts`, {
        id: post.id,
        title,
        content,
      });
      if (res.status === 200) {
        onUpdate(res.data);
        onClose();
      } else {
        console.error("ERROR ", res.statusText);
      }
    } catch (error) {
      console.error("ERROR ", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-md w-1/2">
        <h2 className="text-xl text-gray-800 font-bold mb-4">Edit Post</h2>
        <input
          type="text"
          className="custom-input mb-4"
          value={title}
          onChange={handleTitleChange}
          placeholder="Title"
        />
        <textarea
          className="custom-input mb-4"
          value={content}
          onChange={handleContentChange}
          placeholder="Content"
        />
        <div className="flex justify-end">
          <button onClick={onClose} className=" custom-button bg-blue-500 mr-2">
            Cancel
          </button>
          <button onClick={handleSubmit} className=" custom-button bg-blue-500">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;
