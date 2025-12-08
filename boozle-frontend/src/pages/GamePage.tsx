import React, { useEffect, useState } from "react";

// Services
import { fetchDailyCocktail, fetchNewDailyCocktail, searchCocktailByName } from "../services/api-service";
import { parseCocktailData } from "../services/cocktail-parser-service";

// Components
import GuessInput from "../components/guess-input-component/GuessInput";
import GuessComparison from "../components/guess-comparison-component/GuessComparison";
import type { Cocktail } from "../models/cocktail";
import ClueCard from "../components/clue-card-component/ClueCard";

const GamePage: React.FC = () => {
    //  eslint-disable-next-line @typescript-eslint/no-explicit-any
      const [cocktail, setCocktail] = useState<any>(null);
      const [error] = useState<string | null>(null);
      const [guess, setGuess] = useState<Cocktail>();
      const [hints, setHints] = useState<number>(0);
      const [gameComplete, setComplete] = useState<boolean>(false);
    

      const handleGuessSubmit = async (guess: string) => {
        
        setComplete(guess === parsedCocktail.name);
        setComplete(hints > 3);
        console.log("🚀 ~ handleGuessSubmit ~ hints:", hints)

        // Fetch and set the guess for comparison
        const cocktailData = await searchCocktailByName(guess);
        const parsedData = parseCocktailData(JSON.stringify(cocktailData[0]));

        setGuess(parsedData);
      }
      
      const handleHintUsed = (hints: number) => {
        setHints(hints);
      }

      useEffect(() => {
        fetchDailyCocktail()
        .then(setCocktail)
        .catch(async () => {
          // If no cocktail exists, create a new one
          const newCocktail = await fetchNewDailyCocktail();
          setCocktail(newCocktail);
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