/**
 * Landing page for searches.
 * @param params A search query given to the endpoint
 */
// TODO: Build out the search mechanism to populate this page
import SearchBar from '../../components/search';
import Card from '../../components/card';
import {getSearch} from "@/app/lib/api";

export default async ({params}: { params: Promise<{ query: string }> }) => {
  const id = (await params).query
  let response = await getSearch(id)
  let search_results_json = await response.results

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <SearchBar initialQuery={id} />
      </div>

      <div className="search-results">
        {id ? (
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-6 text-[#902425] border-b-2 border-[#902425] pb-2">
              Search results for "{id}"
            </h2>

            {search_results_json && search_results_json.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {search_results_json.map((item: {
                database: string | undefined;
                recipe: { id: any; imageURL: any; title: string; description: any; };
                ingredient: {id: any; name: any;}
                }, index: any) =>
                item.ingredient ? (
                  <a
                    href={`/ingredients/${item.database === 'IC' ? 'C-' : 'M-'}${item.ingredient.id}`}
                    key={`ingredient-${index}`}
                    className="transform hover:scale-105 transition-transform duration-200"
                  >
                    <Card
                      imageSrc={'/images/default-ingredient.jpg'}
                      title={item.ingredient.name}
                    />
                  </a>
                ) : item.recipe ? (
                  <a
                    href={`/recipes/${item.database === 'D' ? 'drinks' : 'food'}/${item.recipe.id}`}
                    key={`recipe-${index}`}
                    className="transform hover:scale-105 transition-transform duration-200"
                  >
                    <Card
                      imageSrc={item.recipe.imageURL || '/images/default-recipe.jpg'}
                      title={item.recipe.title}
                    />
                  </a>
                ) : null
          )}
              </div>
            ) : (
              <p className="text-gray-600">No results found matching your search.</p>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-600">Enter a search term to begin</div>
        )}
      </div>
    </div>
  )
}