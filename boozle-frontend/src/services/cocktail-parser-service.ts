import type { Cocktail } from "../models/cocktail";

export function parseCocktailData(cocktailData: string | Record<string, unknown>): Cocktail {
    const data = typeof cocktailData === "string" ? JSON.parse(cocktailData) : cocktailData;

    // Parse ingredients and measures
    const ingredients: string[] = [];
    for (let i = 1; i <= 15; i++) {
        const ingredient = data[`strIngredient${i}`];
        if (ingredient) {
            ingredients.push(ingredient);
        }
    }

    // Parse categories and tags
    const categories = data.strCategory ? data.strCategory.split(',').map((cat: string) => cat.trim()) : [];
    const tags = data.strTags ? data.strTags.split(',').map((tag: string) => tag.trim()) : [];
    categories.push(...tags);

    return {
        id: data.idDrink,
        name: data.strDrink,
        categories,
        isAlcoholic: data.strAlcoholic,
        glassType: data.strGlass,
        instructions: data.strInstructions,
        ingredients,
        imageUrl: data.strDrinkThumb,
    }
}