/**
 * Helper function to get an api from the client
 * @param url
 */
export async function getApi(url: string): Promise<any> {
    const response = await fetch(url);
    if (!response.ok) {
        console.error(`Fetch error: ${response.status} ${response.statusText}`);
        throw new Error(response.statusText);
    }
    return await response.json();
}
