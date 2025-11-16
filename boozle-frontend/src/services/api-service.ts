export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetches the daily cocktail
export async function fetchDailyCocktail() {
    const response = await fetch(`${API_BASE_URL}/daily-cocktail`);
    if (!response.ok) {
        throw new Error('Failed to fetch daily cocktail');
    }
    return response.json();
}

// Fetches a new daily cocktail
export async function fetchNewDailyCocktail() {
    const response = await fetch(`${API_BASE_URL}/daily-cocktail/fetch`, {
        method: 'POST',
    });
    if (!response.ok) {
        throw new Error('Failed to fetch new daily cocktail');
    }
    return response.json();
}

// Searches cocktails by a query string
export async function searchAllCocktails(query: string) {
    if(!query) {
        return [];
    }

    try {
        const response = await fetch(`${API_BASE_URL}/search-cocktails?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error('Failed to search cocktails');
        }

        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch {
        console.error('Error searching cocktails');
        return [];
    }
}

// Searches a cocktail by its exact name
export async function searchCocktailByName(name: string) {
    const response = await fetch(`${API_BASE_URL}/search-cocktails?q=${encodeURIComponent(name)}`);
    if (!response.ok) {
        throw new Error('Failed to fetch cocktail by name');
    }

    return response.json();
    
}
