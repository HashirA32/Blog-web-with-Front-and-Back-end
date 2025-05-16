import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { FaRegComments } from "react-icons/fa";
import { ImBlog } from "react-icons/im";
import { FiUsers } from "react-icons/fi";
import {
  RouteBlog,
  RouteBlogByCategory,
  RouteCategoryDetails,
  RouteComment,
  RouteUser,
} from "./Helper/RouteNames";
import { useFetch } from "@/hooks/UseFetch";
import { getEnv } from "./Helper/getenv";
import { useSelector } from "react-redux";

const AppSidebar = () => {
  const user = useSelector((state) => state.user);
  const { data: CategoryData } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/category/all-categories`,
    {
      method: "get",
      Credential: "include",
    }
  );
  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="text-2xl font-extrabold font-sans tracking-tight h-12"></div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <IoHomeOutline />
                  <Link to="/"> Home</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {user && user.isLoggedIn ? (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <ImBlog />
                      <Link to={RouteBlog}>Blogs</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <FaRegComments />
                      <Link to={RouteComment}>Comments</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              ) : (
                <></>
              )}

              {user && user.user.role === "admin" ? (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <BiCategory />
                      <Link to={RouteCategoryDetails}>Categories</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <FiUsers />
                      <Link to={RouteUser}>User</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              ) : (
                <></>
              )}
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Categories</SidebarGroupLabel>

            <SidebarMenu>
              {CategoryData &&
                CategoryData.categories.length > 0 &&
                CategoryData.categories.map((category) => (
                  <SidebarMenuItem key={category._id}>
                    <SidebarMenuButton>
                      <BiCategory />
                      <Link to={RouteBlogByCategory(category.slug)}>
                        {category.name}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    </>
  );
};

export default AppSidebar;
