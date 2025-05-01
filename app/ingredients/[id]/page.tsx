'use client'

import { useState, useEffect } from 'react';
import { callIngredientApiWithID, getAIDescription, getImage } from "@/app/lib/api";
import { IngredientComponent } from "@/app/components/IngredentComponent/IngredientComponent";
import {LoadingComponent} from "@/app/components/LoadingComponent";

export default function Page({ params }: { params: { id: string } }) {
  const [ingredientData, setIngredientData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ingredient = await callIngredientApiWithID(params.id);

        let descriptionData = ingredient.description || await getAIDescription(ingredient.name);
        const description = typeof descriptionData === 'object' && descriptionData.text
          ? descriptionData.text
          : descriptionData;

        let imageURLData = ingredient.imageURL || await getImage(ingredient.name);
        const processedImageURL = typeof imageURLData === 'object' && imageURLData.url
          ? imageURLData.url
          : (typeof imageURLData === 'string' ? imageURLData : null);

        setIngredientData({
          id: ingredient.id || null,
          name: ingredient.name,
          description: description,
          imageURL: processedImageURL
        });
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching ingredient data:', err);
        setError('Failed to load ingredient data');
        setIsLoading(false);
      }
    };

    if (params && params.id){
      fetchData();
    }
  }, [params.id]);

  if (isLoading) {
    return <LoadingComponent />
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!ingredientData) {
    return <div>No ingredient data found</div>;
  }

  return (
    <IngredientComponent
      id={ingredientData.id}
      name={ingredientData.name}
      description={ingredientData.description}
      imageURL={ingredientData.imageURL}
    />
  );
}