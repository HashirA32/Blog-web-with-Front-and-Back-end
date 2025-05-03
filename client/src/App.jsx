import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  RouteAddCategory,
  RouteCategoryDetails,
  RouteEditCategory,
  RouteIndex,
  RouteProfile,
  RouteSignIn,
  RouteSignUp,
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

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route path={RouteIndex} element={<Layout />}>
              <Route index element={<Index />} />
              <Route path={RouteProfile} element={<Profile />} />
              <Route
                path={RouteCategoryDetails}
                element={<CategoryDetails />}
              />
              <Route path={RouteAddCategory} element={<AddCategory />} />
              <Route path={RouteEditCategory()} element={<EditCategory />} />
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
