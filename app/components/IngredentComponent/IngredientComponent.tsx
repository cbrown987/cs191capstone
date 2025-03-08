'use client'

import React, { useState } from "react";
import {IngredientComponentProps} from "@/app/interfaces";
import {getAISubstitutions} from "@/app/lib/api";

export const IngredientComponent: React.FC<IngredientComponentProps> = ({
    id,
    name,
    description,
    imageURL,
}) => {
    const [substitutes, setSubstitutes] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleGetSubstitutes = async () => {
        setLoading(true);
        const fetchedSubstitutes = await getAISubstitutions(name);
        setSubstitutes(fetchedSubstitutes);
        setLoading(false);
    };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 bg-white min-h-screen flex flex-col">
      {/* Header / Title */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-serif tracking-wide text-[#902425]">
          {name}
        </h1>
        <div className="mt-3 mb-5 flex items-center justify-center">
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-8 w-full">
        {/* Left Side: Image */}
        <div className="md:w-1/2 relative">
          <img
            src={imageURL}
            alt={name}
            className="w-full rounded-lg shadow-md object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
            Image by <a href="https://pixabay.com/" className="text-blue-300 hover:text-blue-100">Pixabay</a>
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="md:w-1/2">
          <section>
            <h2 className="text-xl font-serif tracking-wide uppercase mb-5 text-[#902425]">
              Description
            </h2>
            <p className="text-gray-700 mb-6">{description}</p>
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-serif tracking-wide uppercase mb-5 text-[#902425]">
              Substitutes
            </h2>
            <button
              onClick={handleGetSubstitutes}
              className="bg-[#902425] hover:bg-[#701a1b] text-white font-bold py-2 px-4 rounded"
              disabled={loading}
            >
              {loading ? "Loading substitutes..." : "Get Substitutes"}
            </button>
            {substitutes && (
              <div className="mt-4">
                <div
                  className="text-gray-700"
                  // TODO: Purify this or change it completely
                  // TODO: This is unsafe as all hell. change it please
                  dangerouslySetInnerHTML={{ __html: substitutes }}
                />
              </div>
            )}
          </section>
        </div>
      </div>

      <footer className="mt-6 text-center">
        <div className="w-12 h-px bg-black mx-auto mb-2"></div>
      </footer>
    </div>
  );
};