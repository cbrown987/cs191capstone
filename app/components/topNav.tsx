"use client";

// components/TopNav.tsx
import Link from 'next/link';
import React from 'react';
import SearchBar from "@/app/components/search";
import { useRouter } from "next/navigation";

const TopNav: React.FC = () => {
    const router = useRouter();

    return (
        <nav style={{ background: '#333', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem', margin: 0, padding: 0 }}>
                <li>
                    <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/recipes" style={{ color: '#fff', textDecoration: 'none' }}>
                        Recipes
                    </Link>
                </li>
            </ul>

            {/* Search Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <SearchBar />

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
        </nav>
    );
};

export default TopNav;