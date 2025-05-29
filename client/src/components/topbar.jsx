import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { Button } from "./ui/button";
import SearchBar from "./SearchBar";
import {
  RouteBlogAdd,
  RouteIndex,
  RouteProfile,
  RouteSignIn,
} from "./Helper/RouteNames";
import { ModeToggle } from "./mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import UserIcon from "@/assets/images/user.png";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { showToast } from "./Helper/showToast";
import { removeUser } from "@/redux/user/user.slice";
import { getEnv } from "./Helper/getenv";
import { IoMdSearch } from "react-icons/io";
import React, { useState } from "react";
import { SidebarTrigger } from "./ui/sidebar";

const Topbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/logout`,
        {
          method: "get",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }
      dispatch(removeUser());
      navigate(RouteIndex);
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  };

  return (
    <>
      <nav className="w-full flex items-center justify-between px-3 md:px-6 py-3 shadow-sm h-16 fixed z-50 border-b bg-background/10 backdrop-blur top-0">
        <Link to={RouteIndex}>
          <div className="flex items-center space-x-2 font-bold text-xl">
            <SidebarTrigger className="md:hidden" />
            <span className="text-orange-500 text-2xl">HA</span>
            <span>BLOG</span>
          </div>
        </Link>

        <div className="hidden md:block w-full max-w-md mx-4">
          <SearchBar />
        </div>

        <div className="flex gap-2 items-center">
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="p-2"
            >
              <IoMdSearch className="text-2xl w-8 h-8" />
            </button>
          </div>
          <ModeToggle />
          {!user.isLoggedIn ? (
            <Button className="rounded-full" asChild>
              <Link to={RouteSignIn}>
                <FaSignInAlt />
                Sign In
              </Link>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user.user.avatar || UserIcon} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  <p>{user.user.name}</p>
                  <p className="text-sm">{user.user.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to={RouteProfile}>
                    <FaRegCircleUser />
                    <p>Profile</p>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to={RouteBlogAdd}>
                    <IoMdAdd />
                    <p>Add blog</p>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  <IoLogOutOutline color="red" />
                  <p>LogOut</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>

      {showMobileSearch && (
        <div className="md:hidden  px-4 py-2 bg-background shadow z-40 mt-16 fixed w-full">
          <SearchBar />
        </div>
      )}
    </>
  );
};

export default Topbar;
