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

    // Extract data or use empty arrays as fallbacks
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
        <>
        <div className="max-w-4xl mx-auto border-deco">
            {/* Header / Title */}
            <header className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wide">
                    Your Menu
                </h1>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Bites Section */}
                <div>
                    <div className="flex justify-center mb-4">
                        {/* TODO: Replace this with an image once one is available */}
                        <img
                            src="/images/fork_bites_image.png"
                            alt="Decorative Fork"
                            className="decor-img"
                        />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest mb-4">
                        Bites
                    </h2>
                    <ul className="space-y-2">
                        {hasFoodItems ? (
                            food_items.map((item, index) => (
                                <MenuLink
                                    key={item['id'] || index}
                                    linkText={item['title'] || 'Unnamed Item'}
                                    link={item['id'] || '#'}
                                    description={"food"}
                                />
                            ))
                        ) : (
                            <li className="text-gray-500 italic">No food items available at the moment</li>
                        )}
                    </ul>
                </div>

                {/* Right Column */}
                <div>
                    {/* TODO: Replace this with an image once one is available */}
                    <div className="flex justify-center mb-4">
                        <img
                            src="https://via.placeholder.com/60x100?text=Glass"
                            alt="Decorative Wine Glass"
                            className="decor-img"
                        />
                    </div>

                    {/* Drinks Section */}
                    <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest mb-4">
                        Drinks
                    </h2>
                    <ul className="space-y-2">
                        {hasDrinkItems ? (
                            drink_items.map((item, index) => (
                                <MenuLink
                                    key={item['id'] || index}
                                    linkText={item['title'] || 'Unnamed Item'}
                                    link={item['id'] || '#'}
                                    description={"drinks"}
                                />
                            ))
                        ) : (
                            <li className="text-gray-500 italic">No drink items available at the moment</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
        </>
    );
}