"use client";

import { useState, useEffect } from "react";
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
  placeId: number;
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
  onReorderPlaces: (dayId: number, places: Place[]) => void;
  isSelected: boolean;
  onSelect: () => void;
  // isSelected: boolean;
  // onSelect: () => void;
  // onDelete: () => void;
}

const SortablePlace = ({
  place,
  dayId,
  onDeletePlace,
}: {
  place: Place;
  dayId: number;
  onDeletePlace: (dayId: number, placeId: number) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: place.placeId });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: "relative",
    display: "flex",
    backgroundColor: "#f9fafb",
    borderRadius: "6px",
    alignItems: "center",
  };

  return (
    <div key={place.placeId} style={style} className="group ">
      <div className="relative group flex flex-row gap-3 p-5 bg-gray-50 w-full">
        <div
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          className="absolute top-10 left-2"
        >
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
          onClick={() => onDeletePlace(dayId, place.placeId)}
          className="hidden md:block cursor-pointer opacity-0 absolute top-4 right-3 h-4 w-4 rounded group-hover:opacity-100 group-hover:bg-red-400 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const DayPlanBox = ({
  dayId,
  title,
  places,
  onDeletePlace,
  onDeleteDay,
  onReorderPlaces,
  isSelected,
  onSelect,
}: DayPlanBoxProps) => {
  const [isCollapsible, setIsCollapsible] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = places.findIndex((place) => place.placeId === active.id);
      const newIndex = places.findIndex((place) => place.placeId === over.id);
      const newPlaces = arrayMove(places, oldIndex, newIndex);
      onReorderPlaces(dayId, newPlaces);
    }
  };

  return (
    <div
      key={dayId}
      onClick={onSelect}
      className={`drop-shadow ${
        isSelected
          ? "p-0.5 rounded bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          : ""
      }`}
    >
      <div className="group flex justify-between items-center gap-2 rounded-t-lg bg-gray-50 p-4 border-b-1 border-gray-300">
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
        <button
          onClick={() => onDeleteDay(dayId)}
          className="flex gap-1 h-4 w-4 rounded group-hover:bg-red-400"
        >
          <X className="hidden md:w-4 h-4 cursor-pointer opacity-0 rounded group-hover:block group-hover:opacity-100 transition-opacity" />
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
            items={places.map((place) => place.placeId)}
            strategy={verticalListSortingStrategy}
          >
            {places.map((place) => (
              <SortablePlace
                key={place.placeId}
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
