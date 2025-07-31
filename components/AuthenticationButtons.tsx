import { useState } from "react";

const AuthenticationButtons = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="absolute top-0 right-0 z-11">
      {/* Desktop Navigation */}
      <div className="hidden lg:flex justify-end space-x-4 mr-4 mt-4">
        <button className="px-4 py-2 bg-white text-black border border-gray-300 rounded-full">
          Log In
        </button>
        <button className="relative p-[1px] bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full">
          <span className="block bg-white rounded-full px-6 py-2 font-semibold">
            Sign Up
          </span>
        </button>
      </div>

      {/* Mobile Hamburger Menu */}
      <button
        onClick={toggleMenu}
        className="relative top-4 right-4 p-2 lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-16 right-4 bg-white border border-gray-300 rounded-lg shadow-lg lg:hidden ">
          <button className="block px-6 py-2 whitespace-nowrap text-black">
            Log In
          </button>
          <button className="block px-6 py-2 whitespace-nowrap text-black">
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
};

export default AuthenticationButtons;
