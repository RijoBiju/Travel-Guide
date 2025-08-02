import { React, useState, useEffect } from "react";
import { GripVertical, ChevronDown, ChevronUp, Share2, X } from "lucide-react";
import Image from "next/image";
import CalendarWithIcon from "./Calendar";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Place {
  id: number;
  activity: string;
  city: string;
  country: string;
  imageUrl: string;
}

interface DayPlanBoxProps {
  dayId: number;
  title: string;
  places: Place[];
  onDeletePlace: (dayId: number, placeId: number) => void;
  onDeleteDay: (dayId: number) => void;
  // isSelected: boolean;
  // onSelect: () => void;
  // onDelete: () => void;
}

function SortableItem({
  place,
  dayId,
  onDeletePlace,
}: {
  place: Place;
  dayId: number;
  onDeletePlace: (dayId: number, placeId: number) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: place.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "6px",
    backgroundColor: "white",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="absolute top-10 left-2">
        <GripVertical className="w-4 h-full p-0.5 cursor-pointer" />
      </div>
      <Image
        className="rounded object-fill w-16 h-16 ml-2"
        src={place.imageUrl}
        alt="Place Image"
        width={64}
        height={64}
      />
      <div className="flex-1 min-w-0">
        <div className="">
          <h4 className="text-sm font-bold">{place.activity}</h4>
        </div>
        <div className="">
          <p className="text-sm font-medium">
            {place.city + ", " + place.country}
          </p>
        </div>
      </div>
      <button
        onClick={() => onDeletePlace(dayId, place.id)}
        className="hidden md:block cursor-pointer opacity-0 absolute top-4 right-6 h-4 w-4 rounded group-hover:opacity-100 transition-opacity"
      >
        <X className="w-4 h-4 p-0.5" />
      </button>
    </div>
  );
}

const DayPlanBox = ({
  dayId,
  title,
  places,
  onDeletePlace,
  onDeleteDay,
}: // isSelected,
// onSelect,
// onDelete,
DayPlanBoxProps) => {
  const [isCollapsible, setIsCollapsible] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const sensors = useSensors(useSensor(PointerSensor));

  // Called when drag ends
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = places.findIndex((p) => p.id === active.id);
      const newIndex = places.findIndex((p) => p.id === over.id);
      const newPlaces = arrayMove(places, oldIndex, newIndex);
      setPlaces(newPlaces);
    }
  }

  return (
    <div key={dayId} className="drop-shadow group">
      <div className="flex justify-between items-center gap-2 rounded-t-lg bg-gray-50 p-4 border-b-1 border-gray-300">
        <div className="flex gap-2 items-center justify-center">
          <div className="">
            <span className="font-semibold">{title}</span>
            <p className="font-light">{startDate.toLocaleDateString()}</p>
          </div>
          {isCollapsible ? (
            <ChevronUp
              onClick={() => {
                setIsCollapsible(!isCollapsible);
              }}
              className="w-4 h-4 p-0.5 cursor-pointer"
            />
          ) : (
            <ChevronDown
              onClick={() => {
                setIsCollapsible(!isCollapsible);
              }}
              className="w-4 h-4 p-0.5 cursor-pointer"
            />
          )}
          <CalendarWithIcon startDate={startDate} setStartDate={setStartDate} />
          <Share2 className="w-4 h-4 p-0.5 cursor-pointer" />
        </div>
        <button onClick={() => onDeleteDay(dayId)} className="flex gap-1">
          <X className="hidden md:w-4 h-4 p-0.5 cursor-pointer opacity-0 rounded group-hover:block group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
      <div
        className={`transition-all duration-300 overflow-y-auto rounded-b-lg ${
          isCollapsible ? "max-h-[210px]" : "max-h-0"
        }`}
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={places.map((p) => p.id)}
            strategy={verticalListSortingStrategy}
          >
            {places.map((place) => (
              <SortableItem
                key={place.id}
                place={place}
                dayId={dayId}
                onDeletePlace={onDeletePlace}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default DayPlanBox;
