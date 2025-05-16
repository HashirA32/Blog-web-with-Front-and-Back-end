import BlogCard from "@/components/BlogCard";
import { getEnv } from "@/components/Helper/getenv";
import Loading from "@/components/Loading";
import { useFetch } from "@/hooks/UseFetch";
import React from "react";
import { useParams } from "react-router-dom";
import { BiCategory } from "react-icons/bi";

const BlogByCategory = () => {
  const { category } = useParams();
  const {
    data: blogData,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/get-blog-by-category/${category}`,
    {
      method: "get",
      Credential: "include",
    },
    [category]
  );

  if (loading) return <Loading />;
  return (
    <>
      <div className="flex items-center gap-2 text-2xl font-bold border-b pb-2 mb-5 text-orange-400">
        <BiCategory />
        {blogData && blogData.categoryData?.name}
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-10">
        {blogData && blogData.blog.length > 0 ? (
          blogData.blog.map((blog) => <BlogCard key={blog._id} props={blog} />)
        ) : (
          <div>Blogs related data not found</div>
        )}
      </div>
    </>
  );
};

export default BlogByCategory;
