'use client';

import Image from 'next/image';
import React, { useEffect, useState } from "react";
import {CardProps} from "@/app/interfaces";
import SaveRecipeButton from '@/app/components/SaveRecipeButton';

const Card: React.FC<CardProps> = ({ imageSrc, title, type }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Extract the ID from the image URL if needed, or update CardProps to include ID
    const extractIdFromImage = (src: string) => {
      const match = src.match(/\/(\d+)\.(jpg|png|jpeg)$/);
      return match ? match[1] : '';
    };

    const recipeId = extractIdFromImage(imageSrc);

    // Check if user is logged in
    useEffect(() => {
      const user = localStorage.getItem('user');
      setIsLoggedIn(!!user);
    }, []);

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

          {isLoggedIn && recipeId && (
            <SaveRecipeButton recipeId={recipeId} recipeName={title} recipeType={'food'} />
          )}
        </div>
      </div>
    );
  };
  
  export default Card;