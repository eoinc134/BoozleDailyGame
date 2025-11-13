import React, { useEffect, useState } from "react";

// Services
import { fetchDailyCocktail, fetchNewDailyCocktail } from "../services/api-service";
import { parseCocktailData } from "../services/cocktail-parser-service";

// Components
import HintButtons from "../components/hint-buttons-component/HintButtons";
import GuessInput from "../components/guess-input-component/GuessInput";

const GamePage: React.FC = () => {
    //  eslint-disable-next-line @typescript-eslint/no-explicit-any
      const [cocktail, setCocktail] = useState<any>(null);
      const [error] = useState<string | null>(null);

      const handleGuessSubmit = (guess: string) => {
        console.log('User guessed:', guess);
        // Placeholder for handling the submitted guess
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
          <GuessInput onGuessSubmit={handleGuessSubmit} />
          <h1>Today's Cocktail: {parsedCocktail.name}</h1>
        </div>
      )
}

export default GamePage;