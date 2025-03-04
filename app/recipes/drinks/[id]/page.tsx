import {getApi} from "@/app/lib/api";
import {RecipeComponent} from "@/app/components/RecipeComponent/RecipeComponent";

/**
 * Dynamic page for specific drink recipes based on ID
 * @param params The ID passed in the url
 */
export default async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id
  const recipie =  await getApi("http://127.0.0.1:5328/api/drink/recipes/" + id)

  return(
    <>
      <RecipeComponent
          id={recipie['id']}
          title={recipie['title']}
          description={recipie['description']}
          instructions={recipie['instructions']}
          imageURL={recipie['imageURL']}
          ingredients={recipie['ingredients']}
          type={'drinks'}
      />
    </>
  )
}