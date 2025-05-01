const internalApiUrl = 'http://api:8000';

export async function getApi(url: string, revalidateSeconds?: number): Promise<any> {
  const fetchOptions: RequestInit & { next?: { revalidate?: number }; agent?: any } = {
    agent: new (require('https')).Agent({
      rejectUnauthorized: false // Keep for flexibility
    })
  };

  const isServerSide = typeof window === 'undefined';
  let fullUrl: string;

  const isAbsolute = url.startsWith('http://') || url.startsWith('https://');

  if (isAbsolute) {
    fullUrl = url; // Use the provided absolute URL directly
  } else if (isServerSide) {
    if (!internalApiUrl) {
      console.error("FATAL: INTERNAL_API_URL environment variable is not set.");
      throw new Error("INTERNAL_API_URL environment variable is not set for server-side API calls.");
    }

    fullUrl = `${internalApiUrl.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
  } else {
    fullUrl = url.startsWith('/') ? url : `/${url}`;
  }

  console.log(`Executing fetch for: ${fullUrl} (Context: ${isServerSide ? 'Server' : 'Client'})`);

  if (revalidateSeconds !== undefined && isServerSide) {
    fetchOptions.next = { revalidate: revalidateSeconds };
  } else if (revalidateSeconds !== undefined && !isServerSide) {
     console.warn(`'revalidateSeconds' was provided for client-side fetch, but 'next.revalidate' is server-only. Ignoring revalidation for ${fullUrl}`);
  }


  try {
    const response = await fetch(fullUrl, fetchOptions);

    if (!response.ok) {
      console.error(`Fetch error for ${fullUrl}: ${response.status} ${response.statusText}`);
      let errorBody = '';
      try {
        errorBody = await response.text(); // Attempt to get response body for more context
      } catch (e) { /* ignore if reading body fails */ }
      throw new Error(`Fetch failed: ${response.status} ${response.statusText}. URL: ${fullUrl}. Body: ${errorBody}`);
    }

    console.log(`Fetched ${fullUrl}`);
    const r_json = await response.json();
    return r_json;

  } catch (error) {
    console.error(`Error fetching ${fullUrl} (Context: ${isServerSide ? 'Server' : 'Client'}):`, error);
    throw new Error(`Failed to fetch ${fullUrl}. Reason: ${error instanceof Error ? error.message : String(error)}`);
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
  let relativePath = `${basePath}${api}+${id}`;
  relativePath = relativePath.replace(/([^:]\/)\/+/g, "$1");
  return getApi(relativePath, revalidate);
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

export async function getAIChat(query: string, context: object) {
  const response = await fetch(`/api/ai/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: query,
      context: context
    }),
  });
    if (!response.ok) {
    console.error(`Chat API error: ${response.status} ${response.statusText}`);
    throw new Error('Failed to get AI chat response');
  }
  return response.json();
}

export async function getMenu() {
  return await getApi(`/api/menu/`, 86400);
}

export async function saveMenu(menu: object) {
  const response = await fetch('/api/menu/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(menu),
  })
  if (!response.ok) {
    throw new Error('Failed to save menu');
  }
  return response.json();
}

export async function getSavedMenu(user_id: string) {
  return await getApi(`/api/menu/get?user_id=${user_id}`)
}

export async function loginUser(username: string, password: string) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  console.log("Login response:", response);

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
}

export async function signupUser(userData: {
  name: string;
  username: string;
  email: string;
  password: string;
  about?: string;
}) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Signup failed');
  }

  return response.json();
}

export async function saveRecipe(recipeData: {
  username: string;
  recipeName: string;
  recipeId: string;
  recipeType: string;
}) {
  const response = await fetch('/api/recipes/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipeData),
  });

  if (!response.ok) {
    throw new Error('Failed to save recipe');
  }

  return response.json();
}
