import React from "react";
import {IngredientComponentProps} from "@/app/interfaces";

export const IngredientComponent: React.FC<IngredientComponentProps> = ({
    id,
    name,
    description,
    imageURL
}) => {
  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)] bg-gray-50">
      <div className="flex-shrink-0 md:w-1/2 relative">
        <img
          src={imageURL}
          alt={name}
          className="w-full h-64 md:h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
          Image by <a href="https://pixabay.com/" className="text-blue-300 hover:text-blue-100">Pixabay</a>
        </div>
      </div>

      {/* Right Side: Details */}
      <div className="flex flex-col justify-start px-8 py-6 w-full md:w-1/2 overflow-y-auto">
        <h2 className="text-4xl font-extrabold mb-4">{name}</h2>
        <p className="text-gray-700 text-lg mb-6">{description}</p>
      </div>
    </div>
  );
};