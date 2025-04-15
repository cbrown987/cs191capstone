'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [randomMessage, setRandomMessage] = useState('');

  const notFoundMessages = [
    "Looks like this page is taking a day off.",
    "Oops! This page seems to have gone missing.",
    "We've looked everywhere, but couldn't find this page.",
    "This page is playing hide and seek, and it's winning.",
    "404 - Page not in this dimension.",
    "What do you want from us, this page is gone",
    "Haha. your url manipulation is not working",
    "Find delicious food elsewhere, this page is gone"
  ];

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * notFoundMessages.length);
    setRandomMessage(notFoundMessages[randomIndex]);
  }, []);

  return (
    <div className="container mx-auto p-4 min-h-[80vh] flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-xl w-full text-center">
        <h1 className="text-6xl font-bold text-[#902425] mb-2">404</h1>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Page Not Found</h2>

        <p className="text-xl mb-8 text-gray-600">{randomMessage}</p>

        <div className="w-1/2 h-1 bg-[#902425] mx-auto mb-8"></div>

        <p className="mb-8 text-gray-700">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-block px-6 py-3 bg-[#902425] text-white rounded-md hover:bg-opacity-90 transition-all"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
