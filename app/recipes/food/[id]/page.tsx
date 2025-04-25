'use client'

import { useState, useEffect } from 'react';
import {callRecipeApiWithID, getApi} from "@/app/lib/api";
import {RecipeComponent} from "@/app/components/RecipeComponent/RecipeComponent";
import {notFound} from "next/navigation";

/**
 * Dynamic page for specific food recipes based on ID
 * @param params The ID passed in the url
 */
export default function RecipePage({ params }: { params: { id: string } }) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await callRecipeApiWithID("M", params.id);
        setRecipe(data);
        setLoading(false);
      } catch (error) {
        console.error(`Failed to fetch food recipe with ID ${params.id}:`, error);
        setError(true);
        setLoading(false);
      }
    };
    
    fetchRecipe();
  }, [params.id]); // Only re-run if ID changes
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error || !recipe) {
    notFound();
  }

  return(
    <>
      <RecipeComponent
        id={recipe['id'] || params.id}
        title={recipe['title'] || 'Unnamed Recipe'}
        description={recipe['description'] || null}
        instructions={recipe['instructions'] || []}
        imageURL={recipe['imageURL'] || '/images/placeholder-food.png'}
        ingredients={recipe['ingredients'] || []}
        type={"food"}
      />
    </>
  );
}