import {callIngredientApiWithID, getImage} from "@/app/lib/api";
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
  let query = `${recipie['name']} Ingredient`
  let image_url = await getImage(query)


  return(
    <>
      <IngredientComponent
          id={recipie['id']}
          name={recipie['name']}
          description={recipie['description']}
          imageURL={image_url}
      />
    </>
  )
}