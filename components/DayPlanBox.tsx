import { Edit2, Plus, X } from "lucide-react";
import Image from "next/image";
import baliImg from "../public/bali.jpg";

const dayItems = [
  {
    id: 1,
    time: "9:00 AM",
    activity: "Visit Acropolis Museum",
    location: "Athens, Greece",
  },
  {
    id: 2,
    time: "12:00 PM",
    activity: "Lunch at Traditional Taverna",
    location: "Plaka District",
  },
  {
    id: 3,
    time: "3:00 PM",
    activity: "Explore Ancient Agora",
    location: "Athens, Greece",
  },
  {
    id: 4,
    time: "6:00 PM",
    activity: "Sunset at Mount Lycabettus",
    location: "Athens, Greece",
  },
];

const DayPlanBox = () => {
  return (
    <div className="bg-gradient-card shadow-medium border-0 border-gray-100 bg-gray-50">
      <div className="p-4 border-b border-border flex items-center justify-between border-gray-300">
        <div className="flex items-center justify-center gap-2">
          <h3 className="font-semibold text-foreground ">Day 1</h3>
          <button className="h-6 w-6 p-0 rounded hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 hover:text-white transition-colors flex items-center justify-center">
            <Edit2 className="w-3 h-3" />
          </button>
        </div>
        <button className="h-6 w-6 p-0 rounded hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 hover:text-white transition-colors flex items-center justify-center">
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
                <p className="text-xs text-muted-foreground">{item.location}</p>
              </div>
              <button className="h-4 w-4 p-0 rounded opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10 hover:bg-red-400">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DayPlanBox;
