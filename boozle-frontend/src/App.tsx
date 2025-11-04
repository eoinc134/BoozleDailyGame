import { useState, useEffect } from 'react'
import { fetchDailyCocktail, fetchNewDailyCocktail } from './services/api-service';
import './App.css'

function App() {
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

  // 
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!cocktail) {
    return <div>Loading...</div>;
  }

  const parsedCocktail = JSON.parse(cocktail.data);

  return (
    <main>
      <h1>Daily Cocktail</h1>
      <h2>{parsedCocktail.name}</h2>
      <img src={parsedCocktail.image} alt={parsedCocktail.name} width="200" />
      <h3>Ingredients:</h3>
      <ul>
        {parsedCocktail.ingredients.map((ingredient: string, index: number) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p>{parsedCocktail.instructions}</p>
    </main>
  )
}

export default App
