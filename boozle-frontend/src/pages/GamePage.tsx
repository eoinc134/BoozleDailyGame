import React, { useEffect, useState } from "react";

// Services
import { fetchDailyCocktail, fetchNewDailyCocktail, searchCocktailByName } from "../services/api-service";
import { parseCocktailData } from "../services/cocktail-parser-service";

// Components
import HintButtons from "../components/hint-buttons-component/HintButtons";
import GuessInput from "../components/guess-input-component/GuessInput";
import GuessComparison from "../components/guess-comparison-component/GuessComparison";
import type { Cocktail } from "../models/cocktail";

const GamePage: React.FC = () => {
    //  eslint-disable-next-line @typescript-eslint/no-explicit-any
      const [cocktail, setCocktail] = useState<any>(null);
      const [error] = useState<string | null>(null);
      const [guess, setGuess] = useState<Cocktail>();
    

      const handleGuessSubmit = async (guess: string) => {
        // Fetch and set the guess for comparison
        const cocktailData = await searchCocktailByName(guess);
        console.log("Guessed Cocktail: ", cocktailData[0])
        const parsedData = parseCocktailData(JSON.stringify(cocktailData[0]));
        console.log('Parsed guessed cocktail data:', parsedData);

        setGuess(parsedData);
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
      console.log('Cocktail data:', parsedCocktail);
    
      // Render cocktail details
      return (
        <div>
          <HintButtons />
          <GuessInput onGuessSubmit={(value) => handleGuessSubmit(value)} />

          <GuessComparison guess={guess}/>
        </div>
      )
}

export default GamePage;