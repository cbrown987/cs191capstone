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
      rejectUnauthorized: false
    })
  };

  // Check if the URL is already complete (starts with http:// or https://)
  const isCompleteUrl = url.startsWith('http://') || url.startsWith('https://');

  // If URL doesn't have the protocol, add the base URL
  const baseUrl = String(process.env.NEXT_PUBLIC_API_URL);
  console.log("Base URL:", baseUrl);
  const fullUrl = isCompleteUrl ? url : `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;

  if (revalidateSeconds !== undefined) {
    fetchOptions.next = { revalidate: revalidateSeconds };
  }
  try {
    const response = await fetch(fullUrl, fetchOptions);
    if (!response.ok) {
      console.error(`Fetch error: ${response.status} ${response.statusText}`);
      throw new Error(response.statusText);
    }
    console.log(`Fetched ${fullUrl}}`);
    let r_json = await response.json();
    console.log("JSON:", r_json);
    con
    return await r_json;
   } catch (error) {
     console.error(`Error fetching ${fullUrl}:`, error);
     throw new Error(`Error fetching ${error}:`);
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

export async function callIngredientApiWithID(id: string): Promise<any> {
     const url = `/api/ingredients/${id}`;
     return getApi(url);
}


async function callWithID(url: string, api: string, id: string): Promise<any> {
  const revalidate = 86400;
  let call = url + api + "+" + id;
  return getApi(call, revalidate);
}

export async function getImage(query: string) {
  const result = query.replace(/\s+/g, '+');
  return await getApi(`/api/image?query=${result}`)
}

export async function getSearch(query: string) {
  return await getApi(`/api/search?query=${query}`)
}

export async function getAIDescription(query: string) {
  return await getApi(`/api/ai/description/${query}`)
}

export async function getAISubstitutions(query: string) {
  return await getApi(`/api/ai/substitutions/${query}`)
}

export async function getAIChat(query: string, context?: string) {
  const sanitizedQuery = encodeURIComponent(query);
  if (context) {
    const sanitizedContext = encodeURIComponent(context);
    return await getApi(`/api/ai/chat?message=${sanitizedQuery}&context=${sanitizedContext}`);
  }
  return await getApi(`/api/ai/chat?message=${sanitizedQuery}`);
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