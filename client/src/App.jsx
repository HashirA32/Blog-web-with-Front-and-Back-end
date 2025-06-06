import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  RouteAddCategory,
  RouteBlog,
  RouteBlogAdd,
  RouteBlogByCategory,
  RouteBlogDetails,
  RouteBlogEdit,
  RouteBlogSearch,
  RouteCategoryDetails,
  RouteComment,
  RouteEditCategory,
  RouteIndex,
  RouteProfile,
  RouteSignIn,
  RouteSignUp,
  RouteUser,
} from "./components/Helper/RouteNames";
import Layout from "./layout/Layout";
import Index from "./Pages/Index";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { ThemeProvider } from "@/components/theme-provider";
import Profile from "./Pages/Profile";
import CategoryDetails from "./Pages/Category/CategoryDetails";
import AddCategory from "./Pages/Category/AddCategory";
import EditCategory from "./Pages/Category/EditCategory";
import BlogDetails from "./Pages/Blogs/BlogDetails";
import AddBlog from "./Pages/Blogs/AddBlog";
import EditBlog from "./Pages/Blogs/EditBlog";
import SingleBlogDetail from "./Pages/SingleBlogDetail";
import BlogByCategory from "./Pages/Blogs/BlogByCategory";
import SearchResult from "./Pages/SearchResult";
import Comment from "./Pages/Comment";
import User from "./Pages/User";
import AuthRouteProtection from "./components/AuthRouteProtection";
import OnlyAdminAllow from "./components/OnlyAdminAllow";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route path={RouteIndex} element={<Layout />}>
              <Route index element={<Index />} />
              <Route path={RouteBlogDetails()} element={<SingleBlogDetail />} />
              <Route
                path={RouteBlogByCategory()}
                element={<BlogByCategory />}
              />
              <Route path={RouteBlogSearch()} element={<SearchResult />} />

              <Route element={<AuthRouteProtection />}>
                <Route path={RouteBlog} element={<BlogDetails />} />
                <Route path={RouteBlogAdd} element={<AddBlog />} />
                <Route path={RouteBlogEdit()} element={<EditBlog />} />
                <Route path={RouteComment} element={<Comment />} />
                <Route path={RouteProfile} element={<Profile />} />
              </Route>

              <Route element={<OnlyAdminAllow />}>
                <Route path={RouteUser} element={<User />} />
                <Route
                  path={RouteCategoryDetails}
                  element={<CategoryDetails />}
                />
                <Route path={RouteAddCategory} element={<AddCategory />} />
                <Route path={RouteEditCategory()} element={<EditCategory />} />
              </Route>
            </Route>

            <Route path={RouteSignUp} element={<SignUp />} />
            <Route path={RouteSignIn} element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
