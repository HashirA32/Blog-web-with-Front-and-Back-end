import React from "react";
const Loading = () => {
  return (
    <div className="relative w-full h-[60dvh]">
      <div className="absolute top-1/2 left-1/2 w-10 h-10 rotate-[165deg] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute top-1/2 left-1/2 w-2 h-2 rounded-[0.25em] animate-before8" />
        <div className="absolute top-1/2 left-1/2 w-2 h-2 rounded-[0.25em] animate-after6" />
      </div>
    </div>
  );
};

export default Loading;
