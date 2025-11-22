export type GuessRow = {
    cocktailName: {value: string, isCorrect: boolean};
    ingredients: {value: string, isCorrect: boolean}[];
    categories: {value: string, isCorrect: boolean}[];
    alcoholic: {value: string, isCorrect: boolean};
    glass: {value: string, isCorrect: boolean};
}