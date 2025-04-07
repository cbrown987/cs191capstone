'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Recipe {
  [key: string]: string;
}

export default function ProfilePage() {
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

  const recentRecipes: Recipe[] = (user.saved_recipes || []).slice(0, 6);

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 text-gray-800 font-serif">
      <div className="bg-white shadow-md border border-gray-200 rounded-2xl p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2 text-[#902425]">Welcome, {user.name}</h1>
        <p className="text-sm text-gray-500 italic">@{user.username}</p>
        <p className="mt-4">{user.about || 'No about info yet.'}</p>
        <p className="mt-2 text-sm text-gray-500">Email: {user.email}</p>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#902425]">Saved Recipes</h2>
        <button
          onClick={() => router.push('/profile/saved')}
          className="text-sm text-gray-500 hover:text-[#902425] underline transition"
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {recentRecipes.length > 0 ? (
          recentRecipes.map((recipe, index) => {
            const name = Object.keys(recipe)[0];
            const fullId = recipe[name]?.trim().toUpperCase();
            if (!name || !fullId) return null;

            const type = fullId.startsWith("M") ? "food" : "drinks";
            const id = fullId.slice(1);

            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer"
                onClick={() => router.push(`/recipes/${type}/${id}`)}
              >
                <h3 className="text-md font-medium text-gray-700">{name}</h3>
                <p className="text-xs text-gray-400">Recipe ID: {fullId}</p>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-gray-500">No saved recipes yet.</p>
        )}
      </div>

      <div className="mt-10">
        <button
          onClick={() => {
            localStorage.removeItem('user');
            router.push('/login');
          }}
          className="bg-[#902425] text-white px-4 py-2 rounded-lg hover:bg-[#701b1d] transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}