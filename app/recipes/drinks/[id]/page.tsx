import {callRecipeApiWithID, getImage} from "@/app/lib/api";
import {RecipeComponent} from "@/app/components/RecipeComponent/RecipeComponent";

/**
 * Dynamic page for specific drink recipes based on ID
 * @param params The ID passed in the url
 */
export default async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  let recipe: any = null;
  let error = null;

  try {
    recipe = await callRecipeApiWithID("C", id);
  } catch (err) {
    console.error(`Failed to fetch drink recipe with ID ${id}:`, err);
    error = "Failed to load recipe data";
  }
  if (!recipe) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Recipe Not Found</h1>
        <p className="text-lg mb-6">
          {error || `The drink recipe you're looking for (ID: ${id}) could not be found.`}
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
        id={recipe['id'] || id}
        title={recipe['title'] || 'Unnamed Recipe'}
        description={recipe['description'] || 'No description available'}
        instructions={recipe['instructions'] || []}
        imageURL={recipe['imageURL'] || '/images/placeholder-drink.png'}
        ingredients={recipe['ingredients'] || []}
        type={'drinks'}
      />
    </>
  );
}