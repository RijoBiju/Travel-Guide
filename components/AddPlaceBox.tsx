import { useState } from "react";

type AddPlaceBoxProps = {
  city: string;
  country: string;
  selectedDayId: number;
  setActivity: (activity: string) => void;
  onCancel: () => void;
  onAddPlace: () => void;
};

const AddPlaceBox = ({
  city,
  country,
  selectedDayId,
  setActivity,
  onCancel,
  onAddPlace,
}: AddPlaceBoxProps) => {
  const [activity, setActivityState] = useState("");

  return (
    <div className="flex flex-col drop-shadow rounded bg-gray-50 animated-gradient-border">
      <div className="border-gray-300 p-4 border-b border-border">
        <h3 className="text-base font-semibold">Add Place</h3>
      </div>
      <div className="p-4">
        <div className=" bg-gray-200 rounded mb-2">
          <input
            type="text"
            placeholder="Enter Activity..."
            value={activity}
            onChange={(e) => setActivityState(e.target.value)}
            required
            className="p-2 w-full"
          />
        </div>
        <span className="text-md text-gray-500 font-semibold">
          {city}, {country}
        </span>
        {!selectedDayId && (
          <span className="text-sm text-red-400 mt-2 block">
            Select a day before adding a place.
          </span>
        )}
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={() => {
              setActivity(activity);
            }}
            className={`bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-0.5 rounded cursor-pointer
    ${
      !activity.trim() || !selectedDayId ? "opacity-50 cursor-not-allowed" : ""
    }`}
            disabled={!activity.trim() || !selectedDayId}
          >
            <span className="rounded bg-gray-50 h-full w-full text-black p-2">
              Add Place
            </span>
          </button>
          <button
            onClick={onCancel}
            className="bg-black text-white rounded p-2 font-medium cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPlaceBox;
