import { RouteBlogAdd, RouteBlogEdit } from "@/components/Helper/RouteNames";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getEnv } from "@/components/Helper/getenv";
import { useFetch } from "@/hooks/UseFetch";
import { deleteData } from "@/components/Helper/handleDelete";
import { showToast } from "@/components/Helper/showToast";
import Loading from "@/components/Loading";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import moment from "moment";
const BlogDetails = () => {
  const [refreshData, setRefreshData] = useState(false);
  const {
    data: blogData,
    loading,
    error,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/blog/get-all`,
    {
      method: "get",
      Credential: "include",
    },
    [refreshData]
  );

  const hanldeDelete = (id) => {
    const response = deleteData(
      `${getEnv("VITE_API_BASE_URL")}/blog/delete/${id}`
    );
    if (response) {
      setRefreshData(!refreshData);
      showToast("success", "Blog Deleted");
    } else {
      showToast("error", "Blog not Deleted");
    }
  };
  if (loading) return <Loading />;
  return (
    <div>
      <Card>
        <CardHeader>
          <div>
            <Button>
              <Link to={RouteBlogAdd}>Add Blog</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of All Blogs</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Auther</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Tilte</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogData && blogData.blog.length > 0 ? (
                blogData.blog.map((blog) => (
                  <TableRow key={blog._id}>
                    <TableCell className="max-w-25 overflow-hidden">
                      {blog?.auther?.name}
                    </TableCell>
                    <TableCell className="max-w-25 overflow-hidden">
                      {blog?.category?.name}
                    </TableCell>
                    <TableCell className="max-w-25 overflow-hidden">
                      {blog.title}
                    </TableCell>
                    <TableCell className="max-w-25 overflow-hidden">
                      {blog.slug}
                    </TableCell>
                    <TableCell>
                      {moment(blog?.createdAt).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell className=" flex gap-2 ">
                      <Button
                        variant="outline"
                        className="hover:bg-orange-500 hover:text-white"
                      >
                        <Link to={RouteBlogEdit(blog._id)}>
                          <FaEdit />
                        </Link>
                      </Button>
                      <Button
                        onClick={() => {
                          hanldeDelete(blog._id);
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

export default BlogDetails;
