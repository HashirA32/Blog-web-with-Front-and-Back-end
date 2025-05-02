import React from "react";
import LoadingIcon from "@/assets/images/Loading.svg";
const Loading = () => {
  return (
    <div className="w-screen h-screen top-0 left-0 fixed flex items-center justify-center ">
      <img src={LoadingIcon} alt="" width={100} />
    </div>
  );
};

export default Loading;
