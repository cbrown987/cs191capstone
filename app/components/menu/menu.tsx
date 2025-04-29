'use client'

import { useState, useEffect } from 'react';
import {MenuLink} from "@/app/components/menu/menuLink";
import {getMenu, saveMenu, getSavedMenu} from "@/app/lib/api";
import {MenuData} from "@/app/interfaces";
import {getUserID} from "@/app/hooks/Auth";

export const Menu = () => {
        const [menuItems, setMenuItems] = useState<MenuData | null>(null);
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);
        const [data, setData] = useState<any>(null);
        const [savedMenus, setSavedMenus] = useState<any[]>([]);
        const [isDropdownOpen, setIsDropdownOpen] = useState(false);
        const [menuTitle, setMenuTitle] = useState<string>("MENU");

        const handleSaveMenu = () => {
          const user_id = getUserID()
          if (!user_id) {
            return;
          }
          if (data){
            saveMenu({
              "user_id": user_id,
              "menu": data,
              "name": menuTitle
            })
              .then(res => {
                console.log(res);
              })
              .catch(err => {
                console.log(err);
              }
              )
          }
        }

        const handleLoadSpecificMenu = (menuData: any) => {
            setIsLoading(true);
            const formattedData = menuData.menu || menuData;
            setData(formattedData);
            setMenuItems(formattedData);
            if(formattedData.name) {
              setMenuTitle(formattedData.name)
            }
            else {
              setMenuTitle("MENU")
            }
            setIsLoading(false);
            setIsDropdownOpen(false);
        }
        
        const handleOpenDropdown = () => {
            const user_id = getUserID();
            if (!user_id) {
                setIsDropdownOpen(!isDropdownOpen);
                return;
            }
            
            if (!isDropdownOpen && savedMenus.length === 0) {
                getSavedMenu(user_id)
                    .then(data => {
                        console.log('Saved menus:', data);
                        if (Array.isArray(data)) {
                            setSavedMenus(data);
                        }
                    })
                    .catch(err => {
                        console.error('Failed to fetch saved menus:', err);
                    });
            }
            
            setIsDropdownOpen(!isDropdownOpen);
        }
        
        useEffect(() => {
            const fetchMenuItems = async () => {
                try {
                    setIsLoading(true);
                    const data = await getMenu();
                    setData(data);
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
            <div className="max-w-4xl mx-auto px-6 py-8 bg-white flex flex-col border border-[#902425]/20 shadow-md rounded-lg my-8">
                {/* Header / Title */}
                <header className="text-center mb-8">
                    <div className="flex items-center justify-center mb-2">
                        <div className="h-px w-16 bg-[#902425]"></div>
                        <input
                            type="text"
                            value={menuTitle} 
                            onChange={(e) => setMenuTitle(e.target.value)}
                            className="text-3xl font-serif tracking-wide text-[#902425] mx-4 font-bold bg-transparent border-none text-center focus:outline-none focus:ring-0"
                            placeholder="MENU"
                            aria-label="Menu title"
                        />
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
                <footer className="mt-12 text-center px-6">
                    <div className="flex justify-center space-x-4 mb-6">
                        <div className="relative">
                            <button
                                onClick={handleOpenDropdown} // Use new handler to fetch menus
                                className="inline-flex justify-center w-full px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#902425]/50"
                                id="options-menu"
                                aria-haspopup="true"
                                aria-expanded={isDropdownOpen}
                            >
                                Load Menu
                                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                            {isDropdownOpen && (
                                <div
                                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="options-menu"
                                >
                                    <div className="py-1" role="none">
                                        <button
                                            onClick={() => handleLoadSpecificMenu({ menu: data })} // Use existing data as the default menu
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                            role="menuitem"
                                        >
                                            Load Default Menu
                                        </button>
                                        {savedMenus.length === 0 ? (
                                            <div className="block w-full text-left px-4 py-2 text-sm text-gray-500 italic">
                                                No saved menus
                                            </div>
                                        ) : (
                                            savedMenus.map((menuItem, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleLoadSpecificMenu(menuItem)}
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                    role="menuitem"
                                                >
                                                    {menuItem.name || `Saved Menu ${index + 1}`}
                                                </button>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                          className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
                          onClick={handleSaveMenu}
                        >
                            Save Menu
                        </button>
                    </div>
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