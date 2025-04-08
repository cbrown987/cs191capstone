'use client';

import React from "react";
import { RecipeComponentProps } from "@/app/interfaces";
import SaveRecipeButton from "../SaveRecipeButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const RecipeComponent: React.FC<RecipeComponentProps> = ({
  id,
  title,
  description,
  imageURL,
  instructions,
  ingredients,
}) => {
  const pathname = usePathname();
  const isFood = pathname.includes("/food/");
  const type = isFood ? "food" : "drink";

  for (const key in ingredients) {
    ingredients[key].id =
      type === "food"
        ? `${ingredients[key].name}`
        : `${ingredients[key].name}`;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 bg-white min-h-screen flex flex-col">
      <header className="text-center mb-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-3xl font-serif tracking-wide text-[#902425]">
            {title}
          </h1>
          <SaveRecipeButton
            recipeId={id}
            recipeName={title}
            recipeType={type}
          />
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-8 w-full">
        <div className="md:w-1/2 relative">
          <img
            src={imageURL}
            alt={title}
            className="w-full rounded-lg shadow-md object-cover"
          />
        </div>

        <div className="md:w-1/2">
          {description && (
            <section>
              <h2 className="text-xl font-serif tracking-wide uppercase mb-5 text-[#902425]">
                Description
              </h2>
              <p className="text-gray-700 mb-6">{description}</p>
            </section>
          )}

          <section className="mt-6">
            <h2 className="text-xl font-serif tracking-wide uppercase mb-5 text-[#902425]">
              Ingredients
            </h2>
            <ul className="list-disc list-inside">
              {ingredients.map((ingredient: any, index: number) => (
                <li key={`${ingredient.id}-${index}`}>
                  <Link
                    href={`/ingredients/${ingredient.id}`}
                    className="text-gray-600 hover:text-[#902425] cursor-pointer"
                  >
                    {ingredient.measurement} {ingredient.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-serif tracking-wide uppercase mb-5 text-[#902425]">
              Instructions
            </h2>
            <p className="text-gray-600 whitespace-pre-line">
              {instructions}
            </p>
          </section>
        </div>
      </div>

      <footer className="mt-6 text-center">
        <div className="w-12 h-px bg-black mx-auto mb-2"></div>
      </footer>
    </div>
  );
};