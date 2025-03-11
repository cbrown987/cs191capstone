"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {SearchBarProps} from "@/app/interfaces";

const SearchBar: React.FC<SearchBarProps> = ({ initialQuery = '' }) => {
    const [query, setQuery] = useState(initialQuery);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/recipes/${encodeURIComponent(query)}`);
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center">
            <input
                type="text"
                placeholder="Search recipes..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="py-1 px-3 text-base text-gray-800 bg-transparent border-b-2 border-gray-300 focus:border-[#902425] focus:outline-none transition duration-200"
            />

            <button
                type="submit"
                className="ml-2 py-1 px-3 text-gray-800 border-b-2 border-[#902425] font-cinzel hover:text-[#902425] transition duration-200 cursor-pointer"
            >
                Search
            </button>
        </form>
    );
};

export default SearchBar;