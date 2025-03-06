import {callRecipeApiWithID, getApi} from "@/app/lib/api";
import {RecipeComponent} from "@/app/components/RecipeComponent/RecipeComponent";
import {notFound} from "next/navigation";

/**
 * Dynamic page for specific food recipes based on ID
 * @param params The ID passed in the url
 */
export default async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const recipe = await callRecipeApiWithID("M", id).catch((error) => {
    console.error(`Failed to fetch food recipe with ID ${id}:`, error);
    return null;
  });

  // If recipe is null or undefined, show the Next.js 404 page
  if (!recipe) {
    notFound();
  }

  // Provide default values for all required props
  return(
    <>
      <RecipeComponent
        id={recipe['id'] || id}
        title={recipe['title'] || 'Unnamed Recipe'}
        description={recipe['description'] || 'No description available'}
        instructions={recipe['instructions'] || []}
        imageURL={recipe['imageURL'] || '/images/placeholder-food.png'}
        ingredients={recipe['ingredients'] || []}
        type={"food"}
      />
    </>
  );
}