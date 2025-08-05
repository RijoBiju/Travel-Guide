"use client";

import Image from "next/image";
import santoriniImg from "../public/santorini.jpg";
import tokyoImg from "../public/tokyo.jpg";
import baliImg from "../public/bali.jpg";

const suggestions = [
  {
    id: 1,
    image: santoriniImg,
    place: "Santorini, Greece",
    description:
      "Beautiful white buildings and stunning sunsets over the Aegean Sea",
  },
  {
    id: 2,
    image: tokyoImg,
    place: "Tokyo, Japan",
    description:
      "Modern metropolis with traditional culture and amazing cherry blossoms",
  },
  {
    id: 3,
    image: baliImg,
    place: "Bali, Indonesia",
    description:
      "Tropical paradise with lush rice terraces and pristine beaches",
  },
];

const SuggestionsBox = () => {
  return (
    <div className="rounded-xl border border-border bg-surface shadow-sm w-full max-w-md overflow-hidden border-gray-100 bg-gray-50">
      <div className="p-4 border-b border-border border-gray-300">
        <h3 className="text-base font-semibold text-foreground">Suggestions</h3>
      </div>

      <div className="p-4 scrollbar-thin">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-muted cursor-pointer"
          >
            <Image
              src={suggestion.image}
              alt={suggestion.place}
              width={64}
              height={64}
              className="rounded-md object-cover w-16 h-16 flex-shrink-0"
            />
            <div className="flex flex-col">
              <h4 className="text-sm font-bold text-foreground">
                {suggestion.place}
              </h4>
              <p className="text-sm font-light text-muted-foreground">
                {suggestion.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestionsBox;
