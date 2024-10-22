'use client'

import React, { useState } from "react";

const FormComments = () => {
  const [comment, setComment] = useState<string>("");

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setComment(e.target.value);
  };

    const handleSubmitComment = () => {
        console.log("COMMENT SUBMITTED ", comment);
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
        <button onClick={handleSubmitComment} className="custom-button mt-4">Submit comment</button>
      </div>
    </div>
  );
};

export default FormComments;
