import { MenuWrapper } from "@/app/components/menu/MenuWrapper";

export const metadata = {
  title: 'Rubarb',
  description: '',
}


/**
 * Home page (/)
 */
export default () => {

  return (
    <>
      <main className="bg-white text-gray-900 min-h-screen p-8 font-playfair">
        <MenuWrapper />
      </main>
    </>
  )
}