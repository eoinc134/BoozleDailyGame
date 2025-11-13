import type { DailyCocktail } from "../models/cocktail";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseCocktailData(cocktailData: any): DailyCocktail {
    const data = JSON.parse(cocktailData);

    // Parse ingredients and measures
    const ingredients: { name: string; measure: string }[] = [];
    for (let i = 1; i <= 15; i++) {
        const ingredient = data[`strIngredient${i}`];
        const measure = data[`strMeasure${i}`];
        if (ingredient) {
            ingredients.push({ name: ingredient, measure: measure || '' });
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
        isAlcoholic: data.strAlcoholic === 'Alcoholic',
        glassType: data.strGlass,
        instructions: data.strInstructions,
        ingredients,
        imageUrl: data.strDrinkThumb,
    }
}