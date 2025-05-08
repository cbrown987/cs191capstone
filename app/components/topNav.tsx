"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import SearchBar from "@/app/components/search";
import { useRouter } from "next/navigation";

const TopNav: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      } catch (e) {
        console.error("Invalid user in localStorage");
        setUser(null);
      }
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white border-b-2 border-[#902425]">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center">
        <div className="flex items-center space-x-3">
          <img src="/images/rubarb_logo.svg" alt="Rubarb Logo" className="max-h-12 max-w-12 md:max-h-16 md:max-w-16" />
          <span className="text-lg font-bold uppercase font-playfair text-[#902425] md:text-xl">
            Rhubarb
          </span>
        </div>

        <div className="flex-1 flex justify-center">

          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-gray-800 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-4 6h4"></path>
              </svg>
            </button>
          </div>

          <ul className="hidden md:flex flex-row gap-6 list-none m-0 p-0">
            <li className="relative group">
              <Link href="/" className="text-gray-800 hover:text-[#902425] font-cinzel transition duration-200">
                Home
              </Link>
              <div className="absolute left-0 right-0 h-0.5 bg-[#902425] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />
            </li>
            <li className="relative group">
              <Link href="/recipes" className="text-gray-800 hover:text-[#902425] font-cinzel transition duration-200">
                Recipes
              </Link>
              <div className="absolute left-0 right-0 h-0.5 bg-[#902425] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />
            </li>
            <li className="relative group">
              <Link href="/chat" className="text-gray-800 hover:text-[#902425] font-cinzel transition duration-200">
                Chat
              </Link>
              <div className="absolute left-0 right-0 h-0.5 bg-[#902425] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />
            </li>
          </ul>
        </div>

        <div className="hidden md:flex items-center gap-4 flex-grow justify-end">
          <SearchBar />
          {user ? (
            <button onClick={() => router.push("/profile")}>
              <img
                src="/images/user.png"
                alt="User"
                width="32"
                height="32"
                className="h-8 w-8 rounded-full cursor-pointer"
                style={{ minWidth: '32px', minHeight: '32px' }}
              />
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="text-gray-800 py-1 px-3 border-b-2 border-[#902425] font-cinzel hover:text-[#902425] transition duration-200 cursor-pointer"
            >
              Login
            </button>
          )}
        </div>
      </div>

      <div className={`md:hidden ${isMobileMenuOpen ? 'max-h-screen ease-out' : 'max-h-0 ease-in'} transition-all duration-300 overflow-hidden`}>
        <ul className="flex flex-col items-center gap-4 py-4">
          <li>
            <Link href="/" className="text-gray-800 hover:text-[#902425] font-cinzel transition duration-200" onClick={toggleMobileMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/recipes" className="text-gray-800 hover:text-[#902425] font-cinzel transition duration-200" onClick={toggleMobileMenu}>
              Recipes
            </Link>
          </li>
          <li>
            <Link href="/chat" className="text-gray-800 hover:text-[#902425] font-cinzel transition duration-200" onClick={toggleMobileMenu}>
              Chat
            </Link>
          </li>
        </ul>
        <div className="flex flex-col items-center gap-4 pb-4">
          <SearchBar />
          {user ? (
            <button onClick={() => { router.push("/profile"); toggleMobileMenu(); }}>
              <img
                src="/images/user.png"
                alt="User"
                width="32"
                height="32"
                className="h-8 w-8 rounded-full cursor-pointer"
                style={{ minWidth: '32px', minHeight: '32px' }}
              />
            </button>
          ) : (
            <button
              onClick={() => { router.push("/login"); toggleMobileMenu(); }}
              className="text-gray-800 py-1 px-3 border-b-2 border-[#902425] font-cinzel hover:text-[#902425] transition duration-200 cursor-pointer"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNav;