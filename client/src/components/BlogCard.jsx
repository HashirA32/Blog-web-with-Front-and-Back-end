import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { BsCalendar3 } from "react-icons/bs";
import { Link } from "react-router-dom";
import UserIcon from "@/assets/images/user.png";
import moment from "moment";
import { RouteBlogDetails } from "./Helper/RouteNames";

const BlogCard = ({ props }) => {
  return (
    <Link to={RouteBlogDetails(props.category.slug, props.slug)}>
      <Card className="pt-5">
        <CardContent>
          <div className="flex justify-between items-center gap-2 px-1">
            <div className="flex justify-around items-center gap-2 pb-1.5">
              <Avatar>
                <AvatarImage
                  className="w-8 h-8 rounded-full object-cover"
                  src={props.auther.avatar || UserIcon}
                />
              </Avatar>
              <span>{props.auther.name}</span>
            </div>
            <div className="flex justify-around items-center gap-2 pb-1.5">
              {props.auther.role === "admin" && (
                <Badge variant="outline" className="bg-orange-500">
                  Admin
                </Badge>
              )}
            </div>
          </div>

          {/* Feature image section with fixed size and cover styling */}
          <div className="w-full h-48 overflow-hidden rounded-2xl border">
            <img
              src={props.featureImage}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <p className="flex justify-end items-center gap-1 py-1 text-sm">
              <BsCalendar3 />:
              <span>{moment(props.createdAt).format("DD-MM-YYYY")}</span>
            </p>
            <h2 className="font-2xl font-bold line-clamp-2">{props.title}</h2>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
