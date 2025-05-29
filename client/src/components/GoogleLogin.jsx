import React from "react";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./Helper/firebase";
import { RouteIndex } from "./Helper/RouteNames";
import { showToast } from "./Helper/showToast";
import { getEnv } from "./Helper/getenv";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice";

const GoogleLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    try {
      const googleResponse = await signInWithPopup(auth, provider);
      const user = googleResponse.user;
      const bodyData = {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/google-login`,
        {
          method: "post",
          headers: { "Content-type": "application/json" },
          credentials: "include",
          body: JSON.stringify(bodyData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }
      dispatch(setUser(data.user));
      navigate(RouteIndex);
      showToast("success", data.message);
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        showToast("error", "Popup closed before completing the sign in.");
      } else {
        showToast("error", error.message);
      }
    }
  };

  return (
    <>
      <Button onClick={handleLogin} variant={"outline"} className="w-full">
        <FcGoogle />
        Continue with Google
      </Button>
    </>
  );
};

export default GoogleLogin;
