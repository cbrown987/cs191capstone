'use client';
import { useState, useEffect } from 'react';
import { getApi } from "@/app/lib/api";
import Card from '../components/card';

/**
 * Recipes page that displays both food and drink recipes
 * with a Load More button that fetches additional recipes on demand
 */
export default function RecipesPage() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const recipesPerPage = 6;

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async (isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const currentPage = isLoadMore ? page : 1;
      const food_recipes = await getApi(`api/food/recipes?limit=${recipesPerPage}`);
      const drink_recipes = await getApi(`api/drink/recipes?limit=${recipesPerPage}`);

      const newRecipes = [
        ...(food_recipes || []).map((recipe: any) => ({
          ...recipe,
          type: 'food'
        })),
        ...(drink_recipes || []).map((recipe: any) => ({
          ...recipe,
          type: 'drinks'
        }))
      ];

      // If we get fewer recipes than the limit or none, we've reached the end
      if (newRecipes.length === 0) {
        setHasMore(false);
      }

      if (isLoadMore) {
        // Append new recipes to existing ones
        setRecipes(prevRecipes => [...prevRecipes, ...newRecipes]);
        setPage(currentPage + 1);
        setLoadingMore(false);
      } else {
        // Replace existing recipes (first load)
        setRecipes(newRecipes);
        setPage(2); // Next page will be 2
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setLoading(false);
      setLoadingMore(false);
      setHasMore(false);
    }
  };

  const loadMoreRecipes = () => {
    fetchRecipes(true);
  };

  if (loading) {
    return <div className="container mx-auto p-4 text-center">Loading recipes...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-[#902425] border-b-2 border-[#902425] pb-2">
        Our Recipes Collection
      </h1>

      {recipes && recipes.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe: any, index: number) => (
              <a
                href={`/recipes/${recipe.type}/${recipe.id}`}
                key={`recipe-${recipe.type}-${index}`}
                className="transform hover:scale-105 transition-transform duration-200"
              >
                <Card
                  imageSrc={recipe.imageURL || '/images/default-recipe.jpg'}
                  title={recipe.title}
                  type={recipe.type}
                  id={recipe.id}
                />
              </a>
            ))}
          </div>

          {/* Load More button - only show if there are potentially more recipes */}
          {hasMore && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={loadMoreRecipes}
                className="px-6 py-3 bg-[#902425] text-white rounded-md hover:bg-[#701e1f] transition-colors duration-300 disabled:bg-gray-400"
                disabled={loadingMore}
              >
                {loadingMore ? 'Loading...' : 'Load More Recipes'}
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-600">No recipes found.</p>
      )}
    </div>
  );
}