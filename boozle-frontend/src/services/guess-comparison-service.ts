import type { Cocktail } from "../models/cocktail";
import type { GuessRow } from "../models/guessRow";

export function evaluateGuess(dailyCocktail: Cocktail, guessedCocktail: Cocktail): GuessRow {
    console.log("Daily Cocktail: ", dailyCocktail);
    console.log("Guessed Cocktail: ", guessedCocktail)

    const evaluatedRow: GuessRow = {
        cocktailName: {
            value: guessedCocktail.name,
            isCorrect: guessedCocktail.name === dailyCocktail.name
        },
        ingredients: evaulatedGuessArray(dailyCocktail.ingredients, guessedCocktail.ingredients),
        categories: evaulatedGuessArray(dailyCocktail.categories, guessedCocktail.categories),
        alcoholic: {
            value: guessedCocktail.isAlcoholic,
            isCorrect: guessedCocktail.isAlcoholic === dailyCocktail.isAlcoholic
        },
        glass: {
            value: guessedCocktail.glassType,
            isCorrect: guessedCocktail.glassType === dailyCocktail.glassType
        }
    }

     return evaluatedRow;
}

function evaulatedGuessArray(dailyArray: string[], guessArray: string[]): { value: string, isCorrect: boolean }[] {
    const results: {value: string; isCorrect: boolean}[] = [];

    for(const item of guessArray) {
        results.push({value: item, isCorrect: dailyArray.includes(item)})
    }

    return results;
}