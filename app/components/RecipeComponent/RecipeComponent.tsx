import React from "react";
import { RecipeComponentProps } from "@/app/interfaces";
import Link from "next/link";

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
  else{
    for (const ingredientsKey in ingredients) {
      ingredients[ingredientsKey].id = 'C-' + ingredients[ingredientsKey].name
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 bg-white min-h-screen flex flex-col">
      {/* Header / Title */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-serif tracking-wide text-[#902425]">
          {title}
        </h1>
        <div className="mt-3 mb-5 flex items-center justify-center">
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
                    className="text-gray-600 hover:text-[#902425] cursor-pointer">
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