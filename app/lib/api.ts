/**
 * Helper function to get an api from the client
 * @param url
 * @param revalidateSeconds The number of seconds to cache calls. (optional)
 */
export async function getApi(url: string, revalidateSeconds?: number): Promise<any> {
  const fetchOptions: RequestInit & { next?: { revalidate?: number } } = {};

  if (revalidateSeconds !== undefined) {
    fetchOptions.next = { revalidate: revalidateSeconds };
  }

  const response = await fetch(url, fetchOptions);
  if (!response.ok) {
    console.error(`Fetch error: ${response.status} ${response.statusText}`);
    throw new Error(response.statusText);
  }
  return await response.json();
}

/**
 * Calls an API with a specified endpoint and ID, constructs the request URL, and retrieves data.
 *
 * @param {string} api - The API endpoint to call.
 * @param {string} id - The unique identifier to append to the API endpoint.
 * @return {Promise<any>} A promise that resolves with the data retrieved from the API call.
 */
export async function callApiWithID(api: string, id: string): Promise<any>{
  const url = "http://127.0.0.1:5328/api/food/recipes/"
  const revalidate = 86400
  let call = url + api + "+" + id
  return getApi(call, revalidate)
}
