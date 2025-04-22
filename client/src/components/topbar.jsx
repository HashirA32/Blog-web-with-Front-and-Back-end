import { Link } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { Button } from "./ui/button";
import SearchBar from "./SearchBar";
import { RouteSignIn } from "./Helper/RouteNames";

const Topbar = () => {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 bg-white shadow-sm h-16 fixed z-50">
      {/* Logo */}
      <div className="flex items-center space-x-2 font-bold text-xl">
        <span className="text-orange-500 text-2xl">HA</span>
        <span>BLOG</span>
      </div>

      {/* Search */}
      <div className="w-full max-w-md mx-4">
        <SearchBar />
      </div>

      {/* Sign In */}
      <Button className="rounded-full" asChild>
        <Link to={RouteSignIn}>
          <FaSignInAlt />
          Sign In
        </Link>
      </Button>
    </nav>
  );
};

export default Topbar;
