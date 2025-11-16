import { Autocomplete, Button, TextField } from "@mui/material";
import { searchAllCocktails } from "../../services/api-service";
import './GuessInput.css';
import React from "react";

interface GuessInputProps {
    onGuessSubmit: (guess: string) => void;
}

const GuessInput: React.FC<GuessInputProps> = ({ onGuessSubmit }) => {
    const [cocktailOptions, setCocktailOptions] = React.useState<string[]>([]);
    const [guessLabel, setGuessLabel] = React.useState<string>("Insert a drink to start");
    const [guessesMade, setGuessesMade] = React.useState<number>(0);
    const [selectedCocktail, setSelectedCocktail] = React.useState<string>("");    

    const handleInputChange = async (_event: React.SyntheticEvent, value: string) => {
        // Minimum characters before searching
        if (value.length < 2) {
            setCocktailOptions([]);
            return;
        }

        try {
            const results = await searchAllCocktails(value);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const names = results.map((cocktail: any) => cocktail.strDrink);
            setCocktailOptions(names);
        } catch (error) {
            console.error('Error fetching cocktail suggestions:', error);
            setCocktailOptions([]);
        }

    };

    const handleGuess = () => {
        if (!selectedCocktail) return;

        setGuessesMade(prev => prev + 1);
        setGuessLabel(`Guess ${guessesMade + 1}`);
        onGuessSubmit(selectedCocktail);

        return () => {
            // Placeholder for guess submission logic
        };
    }

    return (
        <div>
        <h2 className="guess-input-label">{guessLabel}</h2>
        <div className="guess-input-container">
            <Autocomplete 
            className="guess-input"
            options={cocktailOptions}
            onInputChange={handleInputChange}
            onChange={(_e,value) => setSelectedCocktail(value || "")}
            renderInput={(params) => <TextField {...params} label=""/>} />

            <Button className="submit-guess-button" variant="contained" onClick={handleGuess}>Guess</Button>
        </div>
        </div>
    );
}

export default GuessInput;