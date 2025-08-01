import { Plus } from "lucide-react";

const AddDayButton = () => {
  return (
    <button
      className="
      relative
      w-full h-14 rounded border-2 border-dashed border-gray-300
      overflow-hidden
      hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 hover:text-white transition-colors
    "
    >
      {/* Gradient dashed border on hover */}
      <span
        className="
        pointer-events-none
        absolute inset-0 rounded border-2 border-dashed border-transparent
        bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
        opacity-0 hover:opacity-100
        transition-opacity duration-200
      "
      ></span>

      {/* Button content */}
      <div className="relative flex items-center justify-center gap-2 h-full bg-gray-50 rounded text-gray-700">
        <Plus className="w-5 h-5" />
        <span className="font-medium">Add Day</span>
      </div>
    </button>
  );
};

export default AddDayButton;
