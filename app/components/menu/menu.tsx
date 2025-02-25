import {MenuLink} from "@/app/components/menu/menuLink";
import {getApi} from "@/app/lib/api";
import { use } from "react";

export const Menu = () => {
    let response = use(getApi("http://127.0.0.1:5328/api/recipes"))
    let food_items = [];
    let drink_items = [];
    for (const rKey in response) {
        response[rKey]['id'] = "/" + response[rKey]["type"] + response[rKey]['id']
        let type = response[rKey]["type"]
        if(type === "food"){
            food_items.push(response[rKey])
        }
        else if (type === "drink"){
            drink_items.push(response[rKey])
        }

    }
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
                        {food_items.map(item =>
                            <MenuLink linkText={item['name']} link={item['id']} description={item['description']} />
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
                        {drink_items.map(item =>
                            <MenuLink linkText={item['name']} link={item['id']} description={item['description']}/>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    </>
    );
};
