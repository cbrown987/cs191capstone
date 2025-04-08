import {callIngredientApiWithID, getAIDescription, getAISubstitutions, getImage} from "@/app/lib/api";
import {IngredientComponent} from "@/app/components/IngredentComponent/IngredientComponent";

export default async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id

  let ingredient = await callIngredientApiWithID(id)
  let descriptionData = ingredient.description || await getAIDescription(ingredient.name)
  let imageURLData = ingredient.imageURL || await getImage(ingredient.name)

  const description = typeof descriptionData === 'object' && descriptionData.text
    ? descriptionData.text
    : descriptionData

  const processedImageURL = typeof imageURLData === 'object' && imageURLData.url
    ? imageURLData.url
    : (typeof imageURLData === 'string' ? imageURLData : null)

  return (
    <IngredientComponent
      id={ingredient.id || null}
      name={ingredient.name}
      description={description}
      imageURL={processedImageURL}
    />
  )
}
