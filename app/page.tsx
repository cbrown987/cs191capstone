import Card from "@/app/components/card";
import {Menu} from "@/app/components/menu/menu";

export const metadata = {
  title: 'Rubarb',
  description: 'the recipe site of the future',
}


/**
 * Home page (/)
 */
export default () => {

  return (
      <>
      <main className="bg-white text-gray-900 min-h-screen p-8 font-playfair">
        <Menu />
      </main>
    </>
  )
}
