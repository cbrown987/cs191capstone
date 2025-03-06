import React from "react";
import {IngredientComponentProps} from "@/app/interfaces";

export const IngredientComponent: React.FC<IngredientComponentProps> = ({
    id,
    name,
    description,
    imageURL
  // Match the prop types closely
}) => {
  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Left Side: Full-Height Image */}
      <div className="flex-shrink-0 md:w-1/2">
        <img
          src={imageURL}
          alt={name}
          className="w-full h-64 md:h-full object-cover"
        />
      </div>

      {/* Right Side: Details */}
      <div className="flex flex-col justify-start px-8 py-6 w-full md:w-1/2 overflow-y-auto">
        <h2 className="text-4xl font-extrabold mb-4">{name}</h2>
        <p className="text-gray-700 text-lg mb-6">{description}</p>
      </div>
    </div>
  );
};
