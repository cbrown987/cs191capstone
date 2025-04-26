'use client'

  import { useState, useEffect } from 'react';
  import {MenuLink} from "@/app/components/menu/menuLink";
  import {getMenu} from "@/app/lib/api";
  import {MenuData} from "@/app/interfaces";

export const Menu = () => {
        const [menuItems, setMenuItems] = useState<MenuData | null>(null);
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);

        useEffect(() => {
            const fetchMenuItems = async () => {
                try {
                    setIsLoading(true);
                    const data = await getMenu();
                    setMenuItems(data);
                    setError(null);
                } catch (err) {
                    console.error("Failed to fetch menu items:", err);
                    setError("Failed to load menu.");
                    setMenuItems(null);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchMenuItems().catch(console.error);
        }, []);

        if (isLoading) {
            return (
        <div className="text-center py-16 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-[#902425]/20 border-t-[#902425] rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Loading...</p>
        </div>
    );
}

        if (error) {
            return <div className="text-center py-10 text-red-600">{error}</div>;
        }

        const food_items = menuItems?.food || [];
        const drink_items = menuItems?.drinks || [];
        const hasFoodItems = Array.isArray(food_items) && food_items.length > 0;
        const hasDrinkItems = Array.isArray(drink_items) && drink_items.length > 0;

        return (
            <div className="max-w-4xl mx-auto px-6 py-8 bg-white min-h-screen flex flex-col border border-[#902425]/20 shadow-md rounded-lg my-8">
                {/* Header / Title */}
                <header className="text-center mb-8">
                    <div className="flex items-center justify-center mb-2">
                        <div className="h-px w-16 bg-[#902425]"></div>
                        <h1 className="text-3xl font-serif tracking-wide text-[#902425] mx-4 font-bold">
                            MENU
                        </h1>
                        <div className="h-px w-16 bg-[#902425]"></div>
                    </div>
                </header>

                <div className="grid md:grid-cols-2 gap-10 flex-grow">
                  <section>
                        <h2 className="text-center text-xl font-serif tracking-wide uppercase mb-5 text-[#902425]">
                            Food
                        </h2>

                        <div className="mb-4">
                            <ul className="space-y-0">
                                {hasFoodItems ? (
                                    food_items.slice(0, 8).map((item, index) => (
                                        <MenuLink
                                            key={item['id'] || index}
                                            linkText={item['name'] || 'Unnamed Item'}
                                            link={item['id'] || '#'}
                                            description={item['description'] || 'food'}
                                            type={'food'}
                                        />
                                    ))
                                ) : (<li className="text-gray-500 italic text-center py-2">No food available</li>)}
                            </ul>
                        </div>
                    </section>
                    {/* Drinks Section */}
                    <section>
                        <h2 className="text-center text-xl font-serif tracking-wide uppercase mb-5 text-[#902425]">
                            Drinks
                        </h2>

                        <div className="mb-4">
                            <ul className="space-y-0">
                                {hasDrinkItems ? (
                                    drink_items.slice(0, 8).map((item, index) => (
                                        <MenuLink
                                            key={item['id'] || index}
                                            linkText={item['name'] || 'Unnamed Item'}
                                            link={item['id'] || '#'}
                                            description={item['description'] || 'drink'}
                                            type={'drinks'}
                                        />
                                    ))
                                ) : (
                                    <li className="text-gray-500 italic text-center py-2">No cocktails available</li>
                                )}
                            </ul>
                        </div>
                    </section>
                </div>

                <footer className="mt-12 text-center">
                    <div className="flex items-center justify-center">
                        <div className="h-px w-16 bg-[#902425]/40"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-4 text-[#902425]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <div className="h-px w-16 bg-[#902425]/40"></div>
                    </div>
                </footer>
            </div>
        );
    };