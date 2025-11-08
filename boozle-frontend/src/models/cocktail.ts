export interface Cocktail {
    id: string;
    name: string;
    categories: string[];
    isAlcoholic: boolean;
    glassType: string;
    instructions: string;
    ingredients: {
        name: string;
        measure: string;
    }[];
    imageUrl: string;
}