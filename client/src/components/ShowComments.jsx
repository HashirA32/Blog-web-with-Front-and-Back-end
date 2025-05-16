import { useFetch } from "@/hooks/UseFetch";
import React from "react";
import { getEnv } from "./Helper/getenv";
import { Avatar, AvatarImage } from "./ui/avatar";
import usericon from "@/assets/images/user.png";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useSelector } from "react-redux";
import moment from "moment";
const ShowComments = ({ props }) => {
  const user = useSelector((state) => state.user);
  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/comment/get/${props.blogid}`,
    {
      method: "get",
      credentials: "include",
    }
  );

  return (
    <div>
      <Card className="mt-5 border-none shadow-none">
        <CardHeader className="font-semibold">
          {props.newComment ? (
            <>{data && data.comments.length + 1}</>
          ) : (
            <>{data && data.comments.length}</>
          )}{" "}
          comments
        </CardHeader>
        {props.newComment && (
          <Card>
            <CardHeader className="md:p-0">
              <div className="flex justify-baseline items-center gap-2 md:gap-0 ">
                <Avatar>
                  <AvatarImage
                    className="md:w-[30px] md:h-[10px]"
                    src={user?.user.avatar || usericon}
                  />
                </Avatar>
                <span className="font-semibold md:text-2xl">
                  {user?.user.name}
                </span>
              </div>
            </CardHeader>
            <CardContent>{props.newComment.comment}</CardContent>
          </Card>
        )}
        {data &&
          data.comments.length > 0 &&
          data.comments.map((comment) => {
            return (
              <Card key={comment._id} className="mx-4">
                <CardHeader>
                  <div className="flex md:flex-col justify-between items-baseline gap-2 ">
                    <div className="flex md:flex-col justify-baseline items-center gap-2 ">
                      <Avatar>
                        <AvatarImage src={comment.user.avatar || usericon} />
                      </Avatar>
                      <span className="font-semibold">{comment.user.name}</span>
                    </div>
                    <span className="text-sm">
                      {moment(comment.createdAt).format("DD-MM-YYYY")}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>{comment.comment}</CardContent>
              </Card>
            );
          })}
      </Card>
    </div>
  );
};

export default ShowComments;
