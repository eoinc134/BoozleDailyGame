import { Autocomplete, Button, TextField } from "@mui/material";
import { searchAllCocktails } from "../../services/api-service";
import "./GuessInput.css";
import React from "react";

interface GuessInputProps {
    onGuessSubmit: (guess: string) => void;
    onHintSubmit: (hintsUsed: number) => void;
    hintsUsed: number;
    previousGuesses: string[];
}

const GuessInput: React.FC<GuessInputProps> = ({ onGuessSubmit, onHintSubmit, hintsUsed, previousGuesses }) => {
    const [cocktailOptions, setCocktailOptions] = React.useState<string[]>([]);
    const [selectedCocktail, setSelectedCocktail] = React.useState<string>("");

    const guessLabel = previousGuesses.length === 0
        ? "Insert a drink to start"
        : `Guess ${previousGuesses.length}`;

    const handleInputChange = async (_event: React.SyntheticEvent, value: string) => {
        if (value.length < 1) {
            setCocktailOptions(["Start typing..."]);
            return;
        }

        try {
            const results = await searchAllCocktails(value);
            const names = results
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .filter((cocktail: any) => !previousGuesses.includes(cocktail.strDrink))
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .map((cocktail: any) => cocktail.strDrink);
            setCocktailOptions(names);
        } catch {
            setCocktailOptions([]);
        }
    };

    const handleGuess = () => {
        if (!selectedCocktail) return;
        onGuessSubmit(selectedCocktail);
        setSelectedCocktail("");
    };

    const handleHint = () => {
        onHintSubmit(hintsUsed + 1);
    };

    return (
        <div>
            <h2 className="guess-input-label">{guessLabel}</h2>
            <form
                className="guess-input-container"
                onSubmit={(e) => { e.preventDefault(); handleGuess(); }}
            >
                <Autocomplete
                    className="guess-input"
                    value={selectedCocktail}
                    options={cocktailOptions}
                    onInputChange={handleInputChange}
                    onChange={(_e, value) => setSelectedCocktail(value || "")}
                    getOptionDisabled={(option) => option === "Start typing..."}
                    renderInput={(params) => <TextField {...params} label="" />}
                />
                <Button type="submit" className="submit-guess-button" variant="contained">Guess</Button>
                {hintsUsed < 3 ? (
                    <Button className="submit-guess-button" variant="outlined" onClick={handleHint} type="button">
                        Hint ({3 - hintsUsed})
                    </Button>
                ) : (
                    <Button className="submit-guess-button" variant="outlined" onClick={handleHint} type="button">
                        Give Up?
                    </Button>
                )}
            </form>
        </div>
    );
};

export default GuessInput;
