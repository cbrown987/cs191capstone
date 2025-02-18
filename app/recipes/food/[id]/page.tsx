/**
 * Dynamic page for specific food recipes based on ID
 * @param params The ID passed in the url
 */
export default async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id
  return <div>My Post: {id}</div>
}