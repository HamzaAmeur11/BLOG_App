import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
// import { Comment } from "@/types/blog";
import { Comment as PrismaComment } from "@prisma/client";

interface Comment extends PrismaComment {
  user: {
    name: string;
  };
}


interface CommentsProps {
  comments: Comment[];
}


const Comments: FC<CommentsProps> = ({ comments }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold">Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id} className="mb-4 bg-slate-300 p-2">
            <div className="flex items-center mb-2">
              <div className="mr-2 font-bold text-blue-500">
                {comment.user.name}
              </div>
              <div className="text-gray-500">{format(comment.createdAt, 'MMM d, yyyy')}</div>
            </div>
            <p>{comment.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
