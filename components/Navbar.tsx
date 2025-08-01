import { MapPin } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="h-16 bg-surface border-b border-border flex items-center justify-between px-6 relative z-50 border-gray-300">
      {/* Logo and Title */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-travel rounded-lg flex items-center justify-center">
          <MapPin className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-semibold text-foreground">TravelDash</h1>
      </div>
      {/* Navigation */}
      <div className="flex items-center gap-8">
        <button className="relative px-4 py-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-gradient-to-r after:from-blue-500 after:via-purple-500 after:to-pink-500">
          Home
        </button>
        <button className="px-4 py-2 text-gray-400 hover:text-black transition-colors">
          Trips
        </button>
        <button className="px-4 py-2 text-gray-400 hover:text-black transition-colors">
          Settings
        </button>
      </div>
      <div className="w-24"></div> {/* Spacer for balance */}
    </nav>
  );
};

export default Navbar;
