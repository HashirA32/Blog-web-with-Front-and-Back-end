import {
  RouteAddCategory,
  RouteEditCategory,
} from "@/components/Helper/RouteNames";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetch } from "@/hooks/UseFetch";
import { getEnv } from "@/components/Helper/getenv";
import Loading from "@/components/Loading";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deleteData } from "@/components/Helper/handleDelete";
import { showToast } from "@/components/Helper/showToast";
import { useState } from "react";
import moment from "moment";

const Comment = () => {
  const [refreshData, setRefreshData] = useState(false);
  const { data, loading, error } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/comment/get-all-comment`,
    {
      method: "get",
      Credential: "include",
    },
    [refreshData]
  );

  const handleDelete = (id) => {
    const response = deleteData(
      `${getEnv("VITE_API_BASE_URL")}/comment/delete/${id}`
    );
    if (response) {
      setRefreshData(!refreshData);
      showToast("success", "Data Deleted");
    } else {
      showToast("error", "Data not Deleted");
    }
  };
  console.log(data);
  if (loading) return <Loading />;
  return (
    <div>
      <Card>
        <CardContent>
          <Table>
            <TableCaption>A list of All Comments</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Blog</TableHead>
                <TableHead>Comment By</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.comments.length > 0 ? (
                data.comments.map((comment) => (
                  <TableRow key={comment._id}>
                    <TableCell>{comment?.blogid?.title}</TableCell>
                    <TableCell>{comment?.user?.name}</TableCell>
                    <TableCell>{comment?.comment}</TableCell>
                    <TableCell>
                      {moment(comment?.createdAt).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell className=" flex gap-2 ">
                      <Button
                        onClick={() => {
                          handleDelete(comment._id);
                        }}
                        variant="outline"
                        className="hover:bg-orange-500 hover:text-white"
                      >
                        <MdDelete />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="3">
                    <div>Data Not Found</div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Comment;
