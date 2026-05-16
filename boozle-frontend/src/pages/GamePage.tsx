import React, { useEffect, useState } from "react";

// Services
import { fetchDailyCocktail, fetchNewDailyCocktail, searchCocktailByName } from "../services/api-service";
import { parseCocktailData } from "../services/cocktail-parser-service";

// Components
import GuessInput from "../components/guess-input-component/GuessInput";
import GuessComparison from "../components/guess-comparison-component/GuessComparison";
import type { Cocktail } from "../models/cocktail";
import ClueCard from "../components/clue-card-component/ClueCard";

type DailyCocktailResponse = {
  id: string;
  date: string;
  cocktailData: string;
};

const GamePage: React.FC = () => {
      const [cocktail, setCocktail] = useState<DailyCocktailResponse | null>(null);
      const [error, setError] = useState<string | null>(null);
      const [guess, setGuess] = useState<Cocktail>();
      const [hints, setHints] = useState<number>(0);
      const [gameComplete, setComplete] = useState<boolean>(false);


      const handleGuessSubmit = async (guess: string) => {
        setComplete(guess === parsedCocktail.name);

        const cocktailData = await searchCocktailByName(guess);
        const parsedData = parseCocktailData(cocktailData[0]);

        setGuess(parsedData);
      }

      const handleHintUsed = (hints: number) => {
        setHints(hints);
        setComplete(hints > 3);

        if(hints > 3) {
          handleGuessSubmit(parsedCocktail.name)
        }
      }

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

      // Error and loading states
      if (error) {
        return <div>Error: {error}</div>;
      }
      if (!cocktail) {
        return <div>Loading...</div>;
      }
    
      // Parse cocktail data
      const parsedCocktail = parseCocktailData(cocktail.cocktailData);
    
      // Render cocktail details
      return (
        <div>
          {!gameComplete && (
            <GuessInput onGuessSubmit={(value) => handleGuessSubmit(value)} onHintSubmit={(value) => handleHintUsed(value)} />
          )}

          <ClueCard dailyCocktail={parsedCocktail} hintsUsed={hints} gameComplete={gameComplete} ></ClueCard>

          <GuessComparison dailyCocktail={parsedCocktail} guess={guess}/>
        </div>
      )
}

export default GamePage;