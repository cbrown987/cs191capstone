"use client"; // This page uses a client hook

import { useSearchParams } from 'next/navigation';
import React from 'react';

const SearchResults: React.FC = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('query');

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Search Results</h1>
            {query ? (
                <p>Showing results for: <strong>{query}</strong></p>
            ) : (
                <p>No search query provided.</p>
            )}
            {/* Here, add logic to fetch and display your search results */}
        </div>
    );
};

export default SearchResults;
