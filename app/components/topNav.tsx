'use client'

// components/TopNav.tsx
import Link from 'next/link';
import React from 'react';
import SearchBar from "@/app/components/search";

const TopNav: React.FC = () => {
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
            <SearchBar />
        </nav>
    );
};

export default TopNav;
