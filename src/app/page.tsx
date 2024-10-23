import Image from "next/image";
import Dashboard from "../components/Dashboard";
import FormNewPost from "@/components/FormNewPost";
import { getCurrentUser } from "../../lib/getCurrentUser";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
// import { GetCurrentUser } from "./api/getUser/route";

export default  function Home() {
  // const user = await getCurrentUser();
  // console.log("USER PAGE: ",user);
  // const res = await fetch('/api/getUser')


  
  return (
    <main 
      className="max-w-4xl mx-auto my-5"
      // className="flex min-h-screen flex-col items-center justify-between p-24"
    >
      <FormNewPost />
    </main>
  );
}
