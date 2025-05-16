import BlogCard from "@/components/BlogCard";
import { getEnv } from "@/components/Helper/getenv";
import Loading from "@/components/Loading";
import { useFetch } from "@/hooks/UseFetch";
import React from "react";

const Index = () => {
  const {
    data: blogData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/get-all-blog-home`, {
    method: "get",
    credentials: "include",
  });
  if (loading) return <Loading />;
  return (
    <div className="grid grid-cols-3 gap-10">
      {blogData && blogData.blog.length > 0 ? (
        blogData.blog.map((blog) => <BlogCard props={blog} key={blog._id} />)
      ) : (
        <div>Blogs related data not found</div>
      )}
    </div>
  );
};

export default Index;
