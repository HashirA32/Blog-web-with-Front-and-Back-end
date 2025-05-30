import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="py-3 mt-2 border-t">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm">
        <p>&copy; {new Date().getFullYear()} HA-Blog. All rights reserved.</p>
        <div className="flex space-x-4 sm:mt-0">
          <Link to="" className="hover:text-amber-500 transition">
            Privacy
          </Link>
          <Link to="" className="hover:text-amber-500 transition">
            Terms
          </Link>
          <Link to="" className="hover:text-amber-500 transition">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
