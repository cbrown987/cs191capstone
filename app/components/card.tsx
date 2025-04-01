import Image from 'next/image';
import React from "react";
import {CardProps} from "@/app/interfaces";
import SaveRecipeButton from '@/app/components/SaveRecipeButton';

const Card: React.FC<CardProps> = ({ imageSrc, title }) => {
    // Extract the ID from the image URL if needed, or update CardProps to include ID
    const extractIdFromImage = (src: string) => {
      const match = src.match(/\/(\d+)\.(jpg|png|jpeg)$/);
      return match ? match[1] : '';
    };
  
    const recipeId = extractIdFromImage(imageSrc);
  
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
        <div className="relative w-full h-40">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
  
        <div className="p-4 flex-grow flex flex-col justify-between">
          <h2 className="text-xl font-serif tracking-wide text-[#902425] line-clamp-2 mb-2">
            {title}
          </h2>
  
          {recipeId && (
            <SaveRecipeButton recipeId={recipeId} recipeName={title} />
          )}
        </div>
      </div>
    );
  };
  
  export default Card;