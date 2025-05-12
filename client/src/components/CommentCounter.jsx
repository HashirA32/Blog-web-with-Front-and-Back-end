import React from "react";
import { getEnv } from "./Helper/getenv";
import { useFetch } from "@/hooks/UseFetch";
import { FaRegComment } from "react-icons/fa6";

const CommentCounter = ({ props }) => {
  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/comment/get-count/${props.blogid}`,
    {
      method: "get",
      credentials: "include",
    }
  );
  return (
    <button type="button" className="flex items-center gap-1 cursor-pointer">
      <FaRegComment className="text-orange-500" />

      {data && data.commentCount}
    </button>
  );
};

export default CommentCounter;
