import {callIngredientApiWithID, getAIDescription, getAISubstitutions, getImage} from "@/app/lib/api";
import {IngredientComponent} from "@/app/components/IngredentComponent/IngredientComponent";

export default async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id

  let type = "M"
  let cleanId = id

  if (id.startsWith("C-")) {
    type = "C"
    cleanId = id.substring(2)
  }
  const recipie = await callIngredientApiWithID(type, cleanId)
  let query = `${recipie['name']}`
  let image_url = await getImage(query)
  let recipe_description = recipie['description']

  if(recipe_description === null) {
      recipe_description = await getAIDescription(recipie['name'])
  }

  return(
    <>
      <IngredientComponent
          id={recipie['id']}
          name={recipie['name']}
          description={recipe_description}
          imageURL={image_url}
      />
    </>
  )
}