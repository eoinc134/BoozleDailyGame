import React, { useEffect, useState } from "react";

import { fetchDailyCocktail, fetchNewDailyCocktail, searchCocktailByName } from "../services/api-service";
import { parseCocktailData } from "../services/cocktail-parser-service";

import GuessInput from "../components/guess-input-component/GuessInput";
import GuessComparison from "../components/guess-comparison-component/GuessComparison";
import GameResult from "../components/game-result-component/GameResult";
import ClueCard from "../components/clue-card-component/ClueCard";
import type { Cocktail } from "../models/cocktail";

type DailyCocktailResponse = {
    id: string;
    date: string;
    cocktailData: string;
};

type PersistedState = {
    guesses: Cocktail[];
    hintsUsed: number;
    gameComplete: boolean;
    givenUp: boolean;
};

const STORAGE_KEY = "boozle-game-state";

function getTodayKey(): string {
    return new Date().toISOString().split("T")[0];
}

function loadPersistedState(cocktailId: string): PersistedState | null {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return null;
        const parsed = JSON.parse(stored);
        if (parsed.date !== getTodayKey() || parsed.cocktailId !== cocktailId) return null;
        return {
            guesses: parsed.guesses ?? [],
            hintsUsed: parsed.hintsUsed ?? 0,
            gameComplete: parsed.gameComplete ?? false,
            givenUp: parsed.givenUp ?? false,
        };
    } catch {
        return null;
    }
}

function saveState(cocktailId: string, state: PersistedState): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        date: getTodayKey(),
        cocktailId,
        ...state,
    }));
}

const GamePage: React.FC = () => {
    const [cocktail, setCocktail] = useState<DailyCocktailResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [guesses, setGuesses] = useState<Cocktail[]>([]);
    const [hints, setHints] = useState<number>(0);
    const [gameComplete, setComplete] = useState<boolean>(false);
    const [givenUp, setGivenUp] = useState<boolean>(false);
    const [initialized, setInitialized] = useState<boolean>(false);

    useEffect(() => {
        fetchDailyCocktail()
            .then(setCocktail)
            .catch(async (err: Error & { status?: number }) => {
                if (err.status === 404) {
                    const newCocktail = await fetchNewDailyCocktail();
                    setCocktail(newCocktail);
                } else {
                    setError(err.message);
                }
            });
    }, []);

    // Restore from localStorage once the cocktail id is known
    useEffect(() => {
        if (!cocktail || initialized) return;
        const saved = loadPersistedState(String(cocktail.id));
        if (saved) {
            setGuesses(saved.guesses);
            setHints(saved.hintsUsed);
            setComplete(saved.gameComplete);
            setGivenUp(saved.givenUp);
        }
        setInitialized(true);
    }, [cocktail, initialized]);

    // Persist whenever game state changes
    useEffect(() => {
        if (!cocktail || !initialized) return;
        saveState(String(cocktail.id), { guesses, hintsUsed: hints, gameComplete, givenUp });
    }, [cocktail, initialized, guesses, hints, gameComplete, givenUp]);

    const handleGuessSubmit = async (guessName: string) => {
        setComplete(guessName === parsedCocktail.name);
        const cocktailData = await searchCocktailByName(guessName);
        const parsedData = parseCocktailData(cocktailData[0]);
        setGuesses(prev => [...prev, parsedData]);
    };

    const handleHintUsed = (hintCount: number) => {
        setHints(hintCount);
        if (hintCount > 3) {
            setGivenUp(true);
            setComplete(true);
            handleGuessSubmit(parsedCocktail.name);
        }
    };

    if (error) return <div>Error: {error}</div>;
    if (!cocktail) return <div>Loading...</div>;

    const parsedCocktail = parseCocktailData(cocktail.cocktailData);
    const previousGuesses = guesses.map(g => g.name);

    return (
        <div>
            {!gameComplete && (
                <GuessInput
                    onGuessSubmit={handleGuessSubmit}
                    onHintSubmit={handleHintUsed}
                    hintsUsed={hints}
                    previousGuesses={previousGuesses}
                />
            )}

            <ClueCard dailyCocktail={parsedCocktail} hintsUsed={hints} gameComplete={gameComplete} />

            {gameComplete && (
                <GameResult
                    guesses={guesses}
                    dailyCocktail={parsedCocktail}
                    givenUp={givenUp}
                />
            )}

            <GuessComparison dailyCocktail={parsedCocktail} guesses={guesses} />
        </div>
    );
};

export default GamePage;
