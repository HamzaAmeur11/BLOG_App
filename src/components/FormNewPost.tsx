'use client'
import { FormData } from "@/types/blog";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

const FormNewPost = () => {
  const [form, setForm] = useState<FormData>({
    title: "",
    content: "",
  });
  const router = useRouter();

  const {data} = useSession();
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    const { name ,value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('FORM SUBMIT ',form);
    e.preventDefault();
    try{
      const res = await axios.post('/api/posts',form);
      if (res.status === 200) {
        console.log("i/m here");
        
        router.push(`/blogs/${res.data.newPost.id}`);
      }
    }catch(error){
      console.error('ERROR ',error);
    }
    
  };

  return (
    <form className="max-w-md mx-auto p-4" onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          className='custom-input'
          placeholder="Enter The Title"
          name="title"
          value={form.title}
          type="text"
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <ReactTextareaAutosize 
          minRows={5}
          className='custom-input'
          name="content"
          value={form.content}
          placeholder="Enter The Content"
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="custom-button w-full">
        Submit
        </button>
    </form>
  );
};

export default FormNewPost;
