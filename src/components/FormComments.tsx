import { Comment } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";

interface FromCommentsProps {
  handleSubmit: (newComment: Comment) => void;
  postId: string;
}


const FormComments :FC<FromCommentsProps> = ({ handleSubmit, postId }) => {
  const [comment, setComment] = useState<string>("");
  const router = useRouter();

  const handleSubmitComment = async () => {
    console.log("COMMENT SUBMITTED ", comment);
    if (comment.trim() !== "") {
        try {
            const res = await axios.post("/api/comments", {
                content: comment,
                postId: postId
            });
            if (res.status === 200) {
                // setComment("");
                console.log("COMMENT ", res.data.newComment);
                handleSubmit(res.data.newComment);
                setComment("");
            } else 
                console.error("ERROR ", res.statusText);
        } catch (error) {
            console.error("ERROR ", error);
        }
    }
};

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  return (
    <div>
      <div className="mt-4">
        <label
          htmlFor="comment"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Add Comments
        </label>
        <input
          type="text"
          className="custom-input"
          name="comment"
          value={comment}
          onChange={handleCommentChange}
        />
        <button onClick={handleSubmitComment} className=" custom-button bg-blue-500 mt-4">Submit comment</button>
      </div>
    </div>
  );
};

export default FormComments;
