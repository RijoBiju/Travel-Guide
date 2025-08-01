import { useState } from "react";
import { Edit2, Plus, X } from "lucide-react";
import Image from "next/image";
import baliImg from "../public/bali.jpg";
import AddActivityModal from "./AddActivityModal"; // Adjust path if needed

type MarkerType = {
  id: number;
  lat: number;
  lon: number;
  name: string;
};

type DayPlanBoxProps = {
  setMarkers: React.Dispatch<React.SetStateAction<MarkerType[]>>;
};

const DayPlanBox = ({ setMarkers }: DayPlanBoxProps) => {
  const [dayItems, setDayItems] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [dayTitle, setDayTitle] = useState("Day 1");

  const [modalOpen, setModalOpen] = useState(false);

  const handleEditClick = () => setIsEditing(true);
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDayTitle(e.target.value);
  const handleBlur = () => setIsEditing(false);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") setIsEditing(false);
  };

  // Delete day item and its marker by id
  const handleDelete = (id: number) => {
    setDayItems((prev) => prev.filter((item) => item.id !== id));
    setMarkers((prev) => prev.filter((marker) => marker.id !== id));
  };

  // When modal saves new activity, add day item and marker with same id
  const handleSaveNewActivity = (
    activity: string,
    place: string,
    coords: { lat: number; lon: number }
  ) => {
    const newId = dayItems.length
      ? Math.max(...dayItems.map((i) => i.id)) + 1
      : 1;
    const time = "TBD";
    setDayItems((prev) => [
      ...prev,
      { id: newId, time, activity, location: place },
    ]);

    setMarkers((prev) => [
      ...prev,
      {
        id: newId,
        lat: coords.lat,
        lon: coords.lon,
        name: `${activity} @ ${place}`,
      },
    ]);

    setModalOpen(false);
  };

  return (
    <>
      <div className="bg-gradient-card shadow-medium border-0 border-gray-100 bg-gray-50">
        <div className="p-4 border-b border-border flex items-center justify-between border-gray-300">
          <div className="flex items-center justify-center gap-2">
            {isEditing ? (
              <input
                type="text"
                value={dayTitle}
                onChange={handleTitleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                autoFocus
                className="text-foreground font-semibold text-lg px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <h3 className="font-semibold text-foreground cursor-text">
                {dayTitle}
              </h3>
            )}
            <button
              onClick={handleEditClick}
              className="h-6 w-6 p-0 rounded hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 hover:text-white transition-colors flex items-center justify-center"
            >
              <Edit2 className="w-3 h-3" />
            </button>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="h-6 w-6 p-0 rounded hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 hover:text-white transition-colors flex items-center justify-center"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>

        <div className="h-64 overflow-y-auto p-2 space-y-3 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
          <div className="p-1 space-y-3">
            {dayItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 p-3 rounded-lg hover:bg-surface-secondary transition-colors group"
              >
                <Image
                  src={baliImg}
                  alt="IDK"
                  width={64}
                  height={64}
                  className="rounded-md object-cover w-16 h-16 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground text-sm mb-1">
                    {item.activity}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {item.location}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="h-4 w-4 p-0 rounded opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10 hover:bg-red-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AddActivityModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveNewActivity}
      />
    </>
  );
};

export default DayPlanBox;
