import { getEnv } from "@/components/Helper/getenv";
import Loading from "@/components/Loading";
import { Avatar } from "@/components/ui/avatar";
import { useFetch } from "@/hooks/UseFetch";
import { AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { useParams } from "react-router-dom";
import UserIcon from "@/assets/images/user.png";
import { marked } from "marked";
import { decodeXML } from "entities";
import moment from "moment";
import Comments from "@/components/Comments";
import CommentCounter from "@/components/CommentCounter";
import LikeCount from "@/components/LikeCount";
import RelatedBlog from "@/components/RelatedBlog";
const SingleBlogDetail = () => {
  const { blog, category } = useParams();
  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/get-blog/${blog}`,
    {
      method: "get",
      Credential: "include",
    },
    [blog, category]
  );

  let htmlContent = "";
  if (data && data.blog && data.blog.blogContent) {
    const content = decodeXML(data.blog.blogContent);
    htmlContent = marked(content);
  }
  if (loading) return <Loading />;
  return (
    <>
      <div className="flex gap-10">
        {data && data.blog && (
          <>
            <div className="border rounded w-[70%]  p-5">
              <h1 className="text-2xl font-bold">{data.blog.title}</h1>
              <div className="flex items-baseline justify-between px-2">
                <div>
                  <div className="flex flex-col justify-start items-start font-semibold">
                    <div className="flex  justify-start items-center gap-2 pt-2">
                      <Avatar>
                        <AvatarImage
                          src={data.blog.auther.avatar || UserIcon}
                        />
                      </Avatar>
                      <span className="text-xl">{data.blog.auther.name}</span>
                    </div>
                    <div className="text-xs">
                      <span>Created At : </span>
                      {moment(data.blog.createdAt).format("DD-MM-YYYY")}
                    </div>
                  </div>
                </div>
                <div className="flex items-baseline justify-between gap-2">
                  <LikeCount props={{ blogid: data.blog._id }} />
                  <CommentCounter props={{ blogid: data.blog._id }} />
                </div>
              </div>
              <div className="py-5">
                <img
                  src={data.blog.featureImage}
                  alt="FeaturedImage"
                  className="rounded"
                />
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: htmlContent, // Render the converted HTML
                }}
              ></div>
              <div className="border-t mt-5 pt-5">
                <Comments props={{ blogid: data.blog._id }} />
              </div>
            </div>
          </>
        )}

        <div className="border rounded w-[30%]">
          <RelatedBlog props={{ category: category, currentBlog: blog }} />
        </div>
      </div>
    </>
  );
};

export default SingleBlogDetail;
