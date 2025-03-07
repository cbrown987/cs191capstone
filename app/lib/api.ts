/**
 * Helper function to get an api from the client
 * @param url The URL to fetch from. If it doesn't start with http:// or https://, the base URL will be prepended.
 * @param revalidateSeconds The number of seconds to cache calls. (optional)
 */
export async function getApi(url: string, revalidateSeconds?: number): Promise<any> {
  const fetchOptions: RequestInit & { next?: { revalidate?: number } } = {};

  // Check if the URL is already complete (starts with http:// or https://)
  const isCompleteUrl = url.startsWith('http://') || url.startsWith('https://');

  // If URL doesn't have the protocol, add the base URL
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5328";
  const fullUrl = isCompleteUrl ? url : `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;

  // if (revalidateSeconds !== undefined) {
  //   fetchOptions.next = { revalidate: revalidateSeconds };
  // }

  try {
    const response = await fetch(fullUrl, fetchOptions);
    if (!response.ok) {
      console.error(`Fetch error: ${response.status} ${response.statusText}`);
      throw new Error(response.statusText);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${fullUrl}:`, error);
    return { error: true, message: "Failed to fetch data" };
  }
}

/**
 * Calls an API with a specified endpoint and ID, constructs the request URL, and retrieves data.
 *
 * @param {string} api - The API endpoint to call.
 * @param {string} id - The unique identifier to append to the API endpoint.
 * @return {Promise<any>} A promise that resolves with the data retrieved from the API call.
 */
export async function callRecipeApiWithID(api: string, id: string): Promise<any> {
  const url = `/api/food/recipes/`;
  return callWithID(url, api, id);
}

export async function callIngredientApiWithID(api: string, id: string): Promise<any> {
  const url = `/api/ingredients/`;
  return callWithID(url, api, id);
}

async function callWithID(url: string, api: string, id: string): Promise<any> {
  const revalidate = 86400;
  let call = url + api + "+" + id;
  return getApi(call, revalidate);
}