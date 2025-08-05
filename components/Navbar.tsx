import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface NavbarProps {
  onTripSave?: (title: string) => void;
  saveButton: boolean;
  tripTitle?: string;
}

const Navbar = ({ onTripSave, saveButton, tripTitle }: NavbarProps) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("Trip Plan Name");

  const router = useRouter();

  useEffect(() => {
    if (tripTitle) {
      setTitle(tripTitle);
    }
  }, [tripTitle]);

  return (
    <nav className="h-16 bg-surface border-b border-border flex items-center justify-between px-6 relative z-50 border-gray-300">
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
      <div className="flex items-center gap-8">
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
          className={`bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded p-0.5 cursor-pointer`}
        >
          <div className="pl-3 pr-3 pt-1 pb-1 bg-white rounded h-full w-full">
            Save
          </div>
        </div>
      ) : (
        <div className="w-24"></div>
      )}
    </nav>
  );
};

export default Navbar;
