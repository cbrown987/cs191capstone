import {callIngredientApiWithID} from "@/app/lib/api";
import {IngredientComponent} from "@/app/components/IngredentComponent/IngredientComponent";


export default async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id
  const recipie =  await callIngredientApiWithID("M", id)

  return(
    <>
      <IngredientComponent
          id={recipie['id']}
          name={recipie['name']}
          description={recipie['description']}
          imageURL={recipie['imageURL']}
      />
    </>
  )
}