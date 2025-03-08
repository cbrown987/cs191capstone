"use client";

// components/TopNav.tsx
import Link from 'next/link';
import React from 'react';
import SearchBar from "@/app/components/search";
import { useRouter } from "next/navigation";

const TopNav: React.FC = () => {
    const router = useRouter();

    return (
        <nav className="bg-white border-b-2 border-[#902425]">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center">
                {/* Left section: Logo and brand name */}
                <div className="flex items-center space-x-3 w-1/4">
                    <img src="/images/rubarb_logo.svg" alt="Rubarb Logo" className="max-h-16 max-w-16"/>
                    <span className="text-xl font-bold uppercase font-playfair text-[#902425]">
                        Rhubarb
                    </span>
                </div>

                {/* Middle section: Navigation links - now centered */}
                <div className="flex-1 flex justify-center">
                    <ul className="flex gap-6 list-none m-0 p-0">
                        <li className="relative group">
                            <Link href="/" className="text-gray-800 hover:text-[#902425] font-cinzel transition duration-200">
                                Home
                            </Link>
                            <div className="absolute left-0 right-0 h-0.5 bg-[#902425] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center"></div>
                        </li>
                        <li className="relative group">
                            <Link href="/recipes" className="text-gray-800 hover:text-[#902425] font-cinzel transition duration-200">
                                Recipes
                            </Link>
                            <div className="absolute left-0 right-0 h-0.5 bg-[#902425] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center"></div>
                        </li>
                    </ul>
                </div>

                {/* Right section: Search and Login */}
                <div className="flex items-center gap-4 w-1/4 justify-end">
                    <SearchBar/>
                    {/* Login Button */}
                    <button
                        onClick={() => router.push("/login")}
                        className="text-gray-800 py-1 px-3 border-b-2 border-[#902425] font-cinzel hover:text-[#902425] transition duration-200 cursor-pointer"
                    >
                        Login
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default TopNav;