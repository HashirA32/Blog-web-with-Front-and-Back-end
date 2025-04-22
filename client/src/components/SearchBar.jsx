import React from "react";
import { Input } from "./ui/input";

const SearchBar = () => {
  return (
    <form action="">
      <Input
        type="text"
        placeholder="Search here..."
        className="h-9 rounded-full  bg-gray-100"
      />
    </form>
  );
};

export default SearchBar;
