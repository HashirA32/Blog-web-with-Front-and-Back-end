import React from "react";
import usericon from "@/assets/images/user.png";
import { useFetch } from "@/hooks/UseFetch";
import { getEnv } from "./Helper/getenv";
import Loading from "./Loading";

import { Link } from "react-router-dom";
import { RouteBlogDetails } from "./Helper/RouteNames";
const RelatedBlog = ({ props }) => {
  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/get-related-blog/${props.category}/${
      props.currentBlog
    }`,
    {
      method: "get",
      credentials: "include",
    }
  );
  if (loading) return <Loading />;
  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold">Related Blogs</h2>

      {data && data.relatedBlog.length > 0 ? (
        data.relatedBlog.map((blog) => {
          return (
            <Link
              key={blog._id}
              to={RouteBlogDetails(props.category, blog.slug)}
            >
              <div className="flex items-center gap-2 md:gap-1 mt-2">
                <img
                  className="w-[100px] h-[70px] md:w-[60px] md:h-[40px] rounded"
                  src={blog.featureImage || usericon}
                  alt=""
                />
                <h4 className="text-sm">{blog.title}</h4>
              </div>
            </Link>
          );
        })
      ) : (
        <div>No Related blog found</div>
      )}
    </div>
  );
};

export default RelatedBlog;
