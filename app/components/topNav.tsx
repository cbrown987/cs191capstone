"use client";

// components/TopNav.tsx
import Link from 'next/link';
import React from 'react';
import SearchBar from "@/app/components/search";
import { useRouter } from "next/navigation";

const TopNav: React.FC = () => {
    const router = useRouter();

    return (
        <nav className="bg-white border-b border-gray-300">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <img src="/images/rubarb_logo.svg" alt="Rubarb Logo" className="max-h-16 max-w-16"/>

                    <span className="text-xl font-bold uppercase font-playfair">
                         Rhubarb
                     </span>
                </div>
                <ul style={{listStyle: 'none', display: 'flex', gap: '1rem', margin: 0, padding: 0}}>
                    <li>
                        <Link href="/" className="text-gray-800 hover:text-gray-600 font-cinzel">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/recipes" className="text-gray-800 hover:text-gray-600 font-cinzel">
                            Recipes
                        </Link>
                    </li>
                </ul>
                <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <SearchBar/>
                    {/* Login Button */}
                    <button
                        onClick={() => router.push("/login")}
                        style={{
                            background: '#007bff',
                            color: '#fff',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            cursor: 'pointer',
                            borderRadius: '5px'
                        }}
                    >
                        Login
                    </button>
                </div>

            </div>
        </nav>
    );
};

export default TopNav;