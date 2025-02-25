/**
 * Helper function to get an api from the client
 * @param url
 */
export async function getApi(url: string): Promise<any> {
    const response = await fetch(url);
    if (response.ok) {
        return await response.json();
    }
    throw new Error(response.statusText);
}