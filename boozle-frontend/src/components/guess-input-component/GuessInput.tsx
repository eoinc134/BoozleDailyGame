import { Autocomplete, Button, TextField } from "@mui/material";
import { searchAllCocktails } from "../../services/api-service";
import './GuessInput.css';
import React from "react";

interface GuessInputProps {
    onGuessSubmit: (guess: string) => void;
    onHintSubmit: (hintsUsed: number) => void;
    gameComplete: boolean;
}

const GuessInput: React.FC<GuessInputProps> = ({ onGuessSubmit, onHintSubmit, gameComplete }) => {
    const [cocktailOptions, setCocktailOptions] = React.useState<string[]>([]);
    const [guessLabel, setGuessLabel] = React.useState<string>("Insert a drink to start");
    const [guessesMade, setGuessesMade] = React.useState<string[]>([]);
    const [numGuessesMade, setNumGuessesMade] = React.useState<number>(0);
    const [hintsUsed, setHintsUsed] = React.useState<number>(0);
    const [selectedCocktail, setSelectedCocktail] = React.useState<string>("");    

    const handleInputChange = async (_event: React.SyntheticEvent, value: string) => {
        // Minimum characters before searching
        if (value.length < 1) {
            setCocktailOptions(["Start typing..."]);
            return;
        }

        try {
            const results = await searchAllCocktails(value);
            const names = results
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .filter((cocktail: any) => !guessesMade.includes(cocktail.strDrink))
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((cocktail: any) => cocktail.strDrink);

            setCocktailOptions(names);
        } catch (error) {
            console.error('Error fetching cocktail suggestions:', error);
            setCocktailOptions([]);
        }

    };

    const handleGuess = () => {
        if (!selectedCocktail) return;

        setGuessesMade(prev => [...prev, selectedCocktail])
        setNumGuessesMade(prev => prev + 1);
        setGuessLabel(`Guess ${numGuessesMade + 1}`);
        onGuessSubmit(selectedCocktail);

        // Clear Autocomplete on submit
        setSelectedCocktail("");
    }

    const handleHint = () => {
        setHintsUsed(prev => prev + 1);
        console.log("Updating Hints: ", hintsUsed)
        onHintSubmit(hintsUsed + 1)
    }

    return (
        <div>
        <h2 className="guess-input-label">{guessLabel}</h2>
        <div className="guess-input-container">
            <Autocomplete 
            className="guess-input"
            disabled={gameComplete}
            value={selectedCocktail}
            options={cocktailOptions}
            onInputChange={handleInputChange}
            onChange={(_e,value) => setSelectedCocktail(value || "")}
            getOptionDisabled={(option) => option === "Start typing..."}
            renderInput={(params) => <TextField {...params} label=""/>} />

            <Button disabled={gameComplete} className="submit-guess-button" variant="contained" onClick={handleGuess}>Guess</Button>
            <Button disabled={hintsUsed === 3 || gameComplete} className="submit-guess-button" variant="outlined" onClick={handleHint}>Hint ({3-hintsUsed})</Button>
        </div>
        </div>
    );
}

export default GuessInput;