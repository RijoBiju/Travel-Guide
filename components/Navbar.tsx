import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createPortal } from "react-dom";

interface NavbarProps {
  onTripSave?: (title: string) => void;
  saveButton: boolean;
  tripTitle?: string;
}

const Navbar = ({ onTripSave, saveButton, tripTitle }: NavbarProps) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("Trip Plan Name");
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    console.log("hi");
    setIsOpen(!isOpen);
  };

  const router = useRouter();

  useEffect(() => {
    if (tripTitle) {
      setTitle(tripTitle);
    }
  }, [tripTitle]);

  return (
    <nav className="h-16 bg-surface border-b border-border flex items-center justify-between px-6 relative z-50 border-gray-300 overflow-visible">
      {saveButton ? (
        <div className="flex items-center gap-4">
          {editing ? (
            <input
              type="text"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setEditing(false)}
              className="text-3xl font-bold border border-gray-300 p-1 px-2 rounded w-full"
            />
          ) : (
            <>
              <h1 className="text-3xl font-bold">{title}</h1>
              <button
                onClick={() => setEditing(true)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Pencil size={20} />
              </button>
            </>
          )}
        </div>
      ) : (
        <h1 className="text-3xl font-bold">Trip Dash</h1>
      )}
      <div className="hidden md:flex items-center gap-8">
        <button
          onClick={() => router.push(`/dashboard`)}
          className="relative cursor-pointer px-4 py-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-gradient-to-r after:from-blue-500 after:via-purple-500 after:to-pink-500"
        >
          Home
        </button>
        <button
          onClick={() => router.push(`/trips`)}
          className="px-4 py-2 text-gray-400 hover:text-black transition-colors cursor-pointer"
        >
          Trips
        </button>
      </div>
      {saveButton ? (
        <div
          onClick={() => onTripSave(title)}
          className={`hidden md:block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded p-0.5 cursor-pointer`}
        >
          <div className="pl-3 pr-3 pt-1 pb-1 bg-white rounded h-full w-full">
            Save
          </div>
        </div>
      ) : (
        <div className="w-24"></div>
      )}

      <button onClick={toggleMenu} className="relative p-2 lg:hidden">
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

      {isOpen &&
        typeof window !== "undefined" &&
        createPortal(
          <div className="absolute top-14 right-4 bg-white border border-gray-300 rounded-lg shadow-lg z-999 lg:hidden ">
            <button
              onClick={() => router.push(`/dashboard`)}
              className="block px-6 py-2 whitespace-nowrap text-black"
            >
              Home
            </button>
            <button
              onClick={() => router.push(`/trips`)}
              className="block px-6 py-2 whitespace-nowrap text-black"
            >
              Trips
            </button>
            <button
              onClick={() => onTripSave(title)}
              className="block px-6 py-2 whitespace-nowrap text-black"
            >
              Save
            </button>
          </div>,
          document.body
        )}
    </nav>
  );
};

export default Navbar;
