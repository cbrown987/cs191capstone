/**
 * Helper function to get an api from the client
 * @param url
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

