'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Recipe {
  [key: string]: string;
}

export default function SavedRecipesPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        You are not logged in.
      </div>
    );
  }

  const recipes: Recipe[] = user.saved_recipes || [];

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 text-gray-800 font-serif">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#902425]">All Saved Recipes</h1>
        <p className="text-sm text-gray-500 mt-1">
          {recipes.length} total saved {recipes.length === 1 ? 'recipe' : 'recipes'}.
        </p>
      </div>

      {recipes.length === 0 ? (
        <p className="text-gray-500">No saved recipes yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recipes.map((recipe, index) => {
            const name = Object.keys(recipe)[0];
            const id = recipe[name];
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer"
                onClick={() => router.push(`/recipes/${id}`)}
              >
                <h3 className="text-md font-medium text-gray-700">{name}</h3>
                <p className="text-xs text-gray-400">Recipe ID: {id}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}