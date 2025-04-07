'use client';

import { useState } from 'react';

interface SaveRecipeButtonProps {
  recipeId: string;
  recipeName: string;
  recipeType: 'food' | 'drink';
}

export default function SaveRecipeButton({
  recipeId,
  recipeName,
  recipeType,
}: SaveRecipeButtonProps) {
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      setMessage('You must be logged in to save recipes.');
      return;
    }

    const user = JSON.parse(storedUser);

    const res = await fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'save_recipe',
        username: user.username,
        recipeName,
        recipeId,       // un-prefixed ID
        recipeType,     // "food" or "drink"
      }),
    });

    const data = await res.json();
    if (data.success) {
      setSaved(true);
      setMessage('Recipe saved!');
    } else {
      setMessage(data.message || 'Error saving recipe.');
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleSave}
        disabled={saved}
        className={`px-4 py-2 rounded-lg text-white ${
          saved ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#902425] hover:bg-[#701b1d]'
        }`}
      >
        {saved ? 'Saved' : 'Save Recipe'}
      </button>
      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </div>
  );
}