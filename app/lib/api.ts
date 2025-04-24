// @ts-ignore
process.env.NODE_PG_FORCE_NATIVE = "0";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.AWS_USER,
  host: String(process.env.AWS_HOST),
  database: process.env.AWS_DATABASE,
  password: process.env.AWS_PASSWORD,
  port: parseInt(process.env.AWS_PORT || '5432'),
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
});



export async function getApi(url: string, revalidateSeconds?: number): Promise<any> {
  const fetchOptions: RequestInit & { next?: { revalidate?: number }; agent?: any } = {

    agent: new (require('https')).Agent({
      rejectUnauthorized: false // Keep for flexibility, or remove if only calling relative paths
    })
  };

  if (revalidateSeconds !== undefined) {
    fetchOptions.next = { revalidate: revalidateSeconds };
  }

  try {
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      console.error(`Fetch error for ${url}: ${response.status} ${response.statusText}`);
      let errorBody = '';
      try {
        errorBody = await response.text();
      } catch (e) { /* ignore */ }
      throw new Error(`Fetch failed with status ${response.status} ${response.statusText}. Body: ${errorBody}`);
    }
    console.log(`Fetched ${url} with status ${response.status} ${response.statusText}`);
    let r_json = await response.json();
    console.log("JSON:", r_json);
    return r_json; // No need for await here
   } catch (error) {
     console.error(`Error fetching ${url}:`, error);
     throw new Error(`Error fetching ${url}: ${error instanceof Error ? error.message : String(error)}`);
    }
}

/**
 * Calls an API with a specified endpoint and ID, constructs the request URL, and retrieves data.
 *
 * @param {string} api - The API endpoint part (e.g., 'details').
 * @param {string} id - The unique identifier to append to the API endpoint.
 * @return {Promise<any>} A promise that resolves with the data retrieved from the API call.
 */
export async function callRecipeApiWithID(api: string, id: string): Promise<any> {
  const basePath = `/api/food/recipes/`;
  return callWithID(basePath, api, id);
}

export async function callIngredientApiWithID(id: string): Promise<any> {
     const url = `/api/ingredients/${id}`;
     return getApi(url);
}

async function callWithID(basePath: string, api: string, id: string): Promise<any> {
  const revalidate = 86400;
  let finalPath = `${basePath}${api}/${id}`;
  // Clean up potential double slashes if basePath ends with / and api starts with / (though it shouldn't here)
  finalPath = finalPath.replace(/([^:]\/)\/+/g, "$1");
  console.log("Constructed API call path:", finalPath);
  return getApi(finalPath, revalidate);
}


export async function getImage(query: string) {
  const result = query.replace(/\s+/g, '+');
  // This generates a relative path like /api/image?query=some+query
  return await getApi(`/api/image?query=${result}`)
}

export async function getSearch(query: string) {
  // This generates a relative path like /api/search?query=somequery
  return await getApi(`/api/search?query=${query}`)
}

export async function getAIDescription(query: string) {
  // This generates a relative path like /api/ai/description/somequery
  return await getApi(`/api/ai/description/${query}`)
}

export async function getAISubstitutions(query: string) {
  // This generates a relative path like /api/ai/substitutions/somequery
  return await getApi(`/api/ai/substitutions/${query}`)
}

export async function getAIChat(query: string, context?: string) {
  const sanitizedQuery = encodeURIComponent(query);
  let url = `/api/ai/chat?message=${sanitizedQuery}`;
  if (context) {
    const sanitizedContext = encodeURIComponent(context);
    url += `&context=${sanitizedContext}`;
  }
  return await getApi(url);
}


export async function handleRequest(body: any) {
  const client = await pool.connect(); // gets a fresh client
  try {
    const { type } = body;

    if (type === 'login') {
      const { username, password } = body;
      const result = await client.query(
        'SELECT * FROM users WHERE username = $1 AND password = $2',
        [username, password]
      );
      return result.rows.length > 0
        ? { success: true, user: result.rows[0] }
        : { success: false, message: 'Invalid credentials' };
    }

    if (type === 'signup') {
      const { name, username, email, password, about, saved_recipes } = body;
      await client.query(
        'INSERT INTO users (name, username, email, password, about, saved_recipes) VALUES ($1, $2, $3, $4, $5, $6::jsonb)',
        [name, username, email, password, about, JSON.stringify(saved_recipes)]
      );
      return { success: true, message: 'User created' };
    }

    if (type === 'save_recipe') {
      const { username, recipeName, recipeId, recipeType } = body;

      console.log("Save recipe incoming data:", { username, recipeName, recipeId, recipeType });

      if (!username || !recipeName || !recipeId || !recipeType) {
        return { success: false, message: 'Missing recipe fields' };
      }

      const prefix = (recipeType === "drink" || recipeType === "drinks") ? "C" : "M";
      const fullId = `${prefix}${recipeId}`;

      const newRecipe = { [recipeName]: fullId };

      await client.query(
        'UPDATE users SET saved_recipes = saved_recipes || $1::jsonb WHERE username = $2',
        [JSON.stringify([newRecipe]), username]
      );

      return { success: true, message: 'Recipe saved' };
    }

    return { success: false, message: 'Unsupported request type' };
  } catch (err) {
    console.error('DB handler error:', err);
    return { success: false, message: 'DB error' };
  } finally {
    client.release();
  }
}