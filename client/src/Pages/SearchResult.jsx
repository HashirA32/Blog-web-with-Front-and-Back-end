import BlogCard from "@/components/BlogCard";
import { getEnv } from "@/components/Helper/getenv";
import { useFetch } from "@/hooks/UseFetch";
import React from "react";
import { useSearchParams } from "react-router-dom";
const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const {
    data: blogData,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/search?q=${q}`,
    {
      method: "get",
      Credential: "include",
    },
    [searchParams]
  );
  return (
    <>
      <div className="flex items-center gap-2 text-2xl font-bold border-b pb-2 mb-5 text-orange-400">
        Search Reasults for : {q}
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {blogData && blogData.blog.length > 0 ? (
          blogData.blog.map((blog) => <BlogCard key={blog._id} props={blog} />)
        ) : (
          <div>Blogs related data not found</div>
        )}
      </div>
    </>
  );
};

export default SearchResult;
