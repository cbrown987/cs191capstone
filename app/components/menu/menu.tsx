import {MenuLink} from "@/app/components/menu/menuLink";
import {getApi} from "@/app/lib/api";

const getFoodItems = getApi("/api/food/recipes", 86400); // Cache for 24 hours
const getDrinkItems = getApi("/api/drink/recipes", 86400); // Cache for 24 hours

export const Menu = async () => {
    // Await both requests together with proper error handling
    const [foodItemsResult, drinkItemsResult] = await Promise.allSettled([
        getFoodItems,
        getDrinkItems
    ]);

    const food_items = foodItemsResult.status === 'fulfilled' ? (foodItemsResult.value || []) : [];
    const drink_items = drinkItemsResult.status === 'fulfilled' ? (drinkItemsResult.value || []) : [];

    // Log any errors that occurred
    if (foodItemsResult.status === 'rejected') {
        console.error("Failed to fetch food items:", foodItemsResult.reason);
    }

    if (drinkItemsResult.status === 'rejected') {
        console.error("Failed to fetch drink items:", drinkItemsResult.reason);
    }

    // Check if we have any data to display
    const hasFoodItems = Array.isArray(food_items) && food_items.length > 0;
    const hasDrinkItems = Array.isArray(drink_items) && drink_items.length > 0;

    return (
        <div className="max-w-4xl mx-auto px-6 py-8 bg-white min-h-screen flex flex-col">
            {/* Header / Title */}
            <header className="text-center mb-6">
                <h1 className="text-3xl font-serif tracking-wide text-[#902425]">
                    MENU
                </h1>
                <div className="mt-3 mb-5 flex items-center justify-center">
                </div>
            </header>

            <div className="grid grid-cols-2 gap-8 flex-grow">
                {/* Drinks Section */}
                <section>
                    <h2 className="text-center text-xl font-serif tracking-wide uppercase mb-5 text-[#902425]">
                        Cocktails
                    </h2>

                    <div className="mb-4">
                        <ul className="space-y-0">
                            {hasDrinkItems ? (
                                drink_items.slice(0, 8).map((item, index) => (
                                    <MenuLink
                                        key={item['id'] || index}
                                        linkText={item['title'] || 'Unnamed Item'}
                                        link={item['id'] || '#'}
                                        description={"drinks"}
                                    />
                                ))
                            ) : (
                                <li className="text-gray-500 italic text-center py-2">No cocktails available</li>
                            )}
                        </ul>
                    </div>
                </section>

                {/* Food Section */}
                <section>
                    <h2 className="text-center text-xl font-serif tracking-wide uppercase mb-5 text-[#902425]">
                        Provisions
                    </h2>

                    <div className="mb-4">
                        <ul className="space-y-0">
                            {hasFoodItems ? (
                                food_items.slice(0, 8).map((item, index) => (
                                    <MenuLink
                                        key={item['id'] || index}
                                        linkText={item['title'] || 'Unnamed Item'}
                                        link={item['id'] || '#'}
                                        description={"food"}
                                    />
                                ))
                            ) : (<li className="text-gray-500 italic text-center py-2">No food available</li>)}
                        </ul>
                    </div>
                </section>
            </div>

            <footer className="mt-6 text-center">
                <div className="w-12 h-px bg-black mx-auto mb-2"></div>
                <p className="text-xs tracking-widest uppercase font-light">Thank You For Your Patronage</p>
            </footer>
        </div>
    );
};