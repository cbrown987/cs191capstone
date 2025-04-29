'use client'

import { useState, useEffect} from 'react';
import {callRecipeApiWithID} from "@/app/lib/api";
import {RecipeComponent} from "@/app/components/RecipeComponent/RecipeComponent";

/**
 * Dynamic page for specific drink recipes based on ID
 * @param params The ID passed in the url
 */
export default function DrinkRecipePage({ params }: { params: { id: string } }) {
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await callRecipeApiWithID("C", params.id);
        setRecipe(data);
        setLoading(false);
      } catch (err) {
        console.error(`Failed to fetch drink recipe with ID ${params.id}:`, err);
        setError("Failed to load recipe data");
        setLoading(false);
      }
    };
    
    fetchRecipe();
  }, [params.id]); // Only re-run if ID changes
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error || !recipe) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Recipe Not Found</h1>
        <p className="text-lg mb-6">
          {error || `The drink recipe you're looking for (ID: ${params.id}) could not be found.`}
        </p>
        <a href="/menu" className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
          Return to Menu
        </a>
      </div>
    );
  }

  return(
    <>
      <RecipeComponent
        id={recipe['id'] || params.id}
        title={recipe['title'] || 'Unnamed Recipe'}
        description={recipe['description'] || null}
        instructions={recipe['instructions'] || []}
        imageURL={recipe['imageURL'] || '/images/placeholder-drink.png'}
        ingredients={recipe['ingredients'] || []}
        type={'drinks'}
      />
    </>
  );
}