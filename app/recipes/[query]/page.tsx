/**
 * Landing page for searches.
 * @param params A search query given to the endpoint
 */
// TODO: Build out the search mechanism to populate this page
export default async ({params}: { params: Promise<{ query: string }> }) => {
  const id = (await params).query
  return (
      <div>
          My Post: {id}
      </div>
  )
}