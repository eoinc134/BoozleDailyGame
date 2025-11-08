import React, { useEffect, useState } from "react";
import { fetchDailyCocktail, fetchNewDailyCocktail } from "../services/api-service";
import { parseCocktailData } from "../services/cocktail-parser-service";

const GamePage: React.FC = () => {
    //  eslint-disable-next-line @typescript-eslint/no-explicit-any
      const [cocktail, setCocktail] = useState<any>(null);
      const [error] = useState<string | null>(null);
    
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
        <div className="game-page">
            {/* <Header /> */}
            <main>
            <h1>Daily Cocktail</h1>
        
            <h2>{parsedCocktail.name}</h2>
            <img src={parsedCocktail.imageUrl} alt={parsedCocktail.name} width="200" />
        
            <h3>Ingredients:</h3>
            <ul>
                {parsedCocktail.ingredients.map((ing, index) => (
                <li key={index}>{ing.measure} {ing.name}</li>
                ))}
            </ul>
        
            <h3>Instructions:</h3>
            <p>{parsedCocktail.instructions}</p>
        
            <h3>Categories:</h3>
            <ul>
                {parsedCocktail.categories.map((cat, index) => (
                <li key={index}>{cat}</li>
                ))}
            </ul>
        
            <h3>Glass Type:</h3>
            <p>{parsedCocktail.glassType}</p>
        
            <h3>Alcoholic:</h3>
            <p>{parsedCocktail.isAlcoholic ? 'Yes' : 'No'}</p>
        
            </main>
        </div>
      )
}

export default GamePage;