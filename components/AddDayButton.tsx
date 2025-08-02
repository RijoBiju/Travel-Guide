import { Plus } from "lucide-react";

type AddDayButtonProps = {
  onClick: () => void;
};

const AddDayButton = ({ onClick }: AddDayButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="
        fixed
        bottom-6
        right-6
        z-50
        w-14
        h-14
        rounded-full
        bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
        text-white
        flex
        items-center
        justify-center
        shadow-lg
        hover:scale-105
        transition-transform
      "
      aria-label="Add Day"
    >
      <Plus className="w-7 h-7" />
    </button>
  );
};

export default AddDayButton;
