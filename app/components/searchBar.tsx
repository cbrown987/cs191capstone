"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/search?query=${encodeURIComponent(query)}`);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
            <input
                type="text"
                placeholder="Search recipes..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                    padding: '0.5rem',
                    fontSize: '1rem',
                    border: '1px solid #ccc',
                    borderRadius: '4px 0 0 4px',
                    color: 'black',          // Explicit text color
                    backgroundColor: 'white' // Explicit background
                }}
            />

            <button
                type="submit"
                style={{
                    padding: '0.5rem 1rem',
                    fontSize: '1rem',
                    border: '1px solid #ccc',
                    borderLeft: 'none',
                    borderRadius: '0 4px 4px 0',
                    background: '#0070f3',
                    color: '#fff',
                    cursor: 'pointer',
                }}
            >
                Search
            </button>
        </form>
    );
};

export default SearchBar;
