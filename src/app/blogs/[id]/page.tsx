import Comments from "@/components/Comments";
import FormComments from "@/components/FormComments";
import React from "react";

const BlogDetailsPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Blog Details</h1>
      <div className="bg-white rounded-md p-4 shadow-sm">
        <h2 className="text-xl text-black font-bold">Title</h2>
        <p className="text-gray-600">By Author</p>
        <p className="text-gray-800">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt
          deserunt vero quae minima accusamus qui, quis doloribus tenetur esse,
          aut iste? Doloribus officiis similique harum vitae repellat incidunt
          laborum inventore.
        </p>
      </div>
      <Comments  />
      <FormComments />
    </div>
  );
};

export default BlogDetailsPage;
