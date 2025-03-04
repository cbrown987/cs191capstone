import React from "react";
import { RecipeComponentProps } from "@/app/interfaces";

export const RecipeComponent: React.FC<RecipeComponentProps> = ({
  id,
  title,
  description,
  imageURL,
  instructions,
  ingredients,
  type
}) => {
  if (type=='food'){
    for (const ingredientsKey in ingredients) {
      ingredients[ingredientsKey].id = ingredients[ingredientsKey].name
    }
  }
  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Left Side: Full-Height Image */}
      <div className="flex-shrink-0 md:w-1/2">
        <img
          src={imageURL}
          alt={title}
          className="w-full h-64 md:h-full object-cover"
        />
      </div>

      {/* Right Side: Recipe Details */}
      <div className="flex flex-col justify-start px-8 py-6 w-full md:w-1/2 overflow-y-auto">
        <h2 className="text-4xl font-extrabold mb-4">{title}</h2>
        <p className="text-gray-700 text-lg mb-6">{description}</p>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-3">Ingredients</h3>
          <ul className="list-disc list-inside text-lg">
            {ingredients.map((ingredient: any) => (
              <li key={ingredient.id} className="text-gray-600">
                {ingredient.measurement} {ingredient.name}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-3">Instructions</h3>
          <p className="text-gray-600 text-lg whitespace-pre-line">
            {instructions}
          </p>
        </div>
      </div>
    </div>
  );
};