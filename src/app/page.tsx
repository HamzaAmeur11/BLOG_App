import Image from "next/image";
import Dashboard from "../components/Dashboard";
import FormNewPost from "@/components/FormNewPost";

export default function Home() {
  return (
    <main 
      className="max-w-4xl mx-auto my-5"
      // className="flex min-h-screen flex-col items-center justify-between p-24"
    >
      <FormNewPost />
    </main>
  );
}
