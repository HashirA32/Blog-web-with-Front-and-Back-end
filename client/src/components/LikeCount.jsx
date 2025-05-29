import { useFetch } from "@/hooks/UseFetch";
import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { getEnv } from "./Helper/getenv";
import { useSelector } from "react-redux";
import { showToast } from "./Helper/showToast";
import { useState } from "react";
import { useEffect } from "react";
import { FaHeart } from "react-icons/fa";

const LikeCount = ({ props }) => {
  const [likeCount, setlikeCount] = useState(0);
  const [HasLiked, setHasLiked] = useState(false);
  const user = useSelector((state) => state.user);
  const {
    data: blogLikeCount,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog-like/get-like?blogid=${props.blogid}${
      user && user.isLoggedIn ? `&userid=${user.user._id}` : ""
    }`,
    {
      method: "get",
      credentials: "include",
    }
  );

  useEffect(() => {
    if (blogLikeCount) {
      setlikeCount(blogLikeCount.likeCount);
      setHasLiked(blogLikeCount.isUserliked);
    }
  }, [blogLikeCount]);

  const handleLike = async () => {
    try {
      if (!user.isLoggedIn) {
        return showToast("error", "Please Login first to like this blog.");
      }

      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/blog-like/do-like`,
        {
          method: "post",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ userid: user.user._id, blogid: props.blogid }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        return showToast(
          "error",
          responseData.message || "Something went wrong."
        );
      }

      setlikeCount(responseData.likeCount);
      setHasLiked(!HasLiked);
    } catch (error) {
      showToast("error", error.message);
    }
  };

  return (
    <button
      onClick={handleLike}
      type="button"
      className="flex items-center gap-1 cursor-pointer"
    >
      {!HasLiked ? <FaRegHeart /> : <FaHeart color="red" />}
      {likeCount}
    </button>
  );
};

export default LikeCount;
