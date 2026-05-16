import React from "react";
import { Button, Snackbar, Typography } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import type { Cocktail } from "../../models/cocktail";
import { evaluateGuess } from "../../services/guess-comparison-service";
import { useCountdown } from "../../hooks/useCountdown";
import "./GameResult.css";

type GameResultProps = {
    guesses: Cocktail[];
    dailyCocktail: Cocktail;
    givenUp: boolean;
};

function fieldEmoji(isCorrect: boolean): string {
    return isCorrect ? "🟩" : "🟥";
}

function arrayEmoji(items: { isCorrect: boolean }[]): string {
    const correct = items.filter(i => i.isCorrect).length;
    if (correct === items.length && items.length > 0) return "🟩";
    if (correct > 0) return "🟨";
    return "🟥";
}

const GameResult: React.FC<GameResultProps> = ({ guesses, dailyCocktail, givenUp }) => {
    const timeLeft = useCountdown();
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);

    // Exclude the auto-added answer row that gets appended on give-up
    const playerGuesses = givenUp ? guesses.slice(0, -1) : guesses;
    const guessCount = playerGuesses.length;

    const handleShare = () => {
        const today = new Date().toLocaleDateString("en-GB", {
            day: "numeric", month: "short", year: "numeric",
        });

        const resultLine = givenUp
            ? `Gave up after ${guessCount} guess${guessCount !== 1 ? "es" : ""} 😔`
            : `Got it in ${guessCount} ${guessCount === 1 ? "try" : "tries"}! 🍸`;

        const grid = playerGuesses.map(guess => {
            const row = evaluateGuess(dailyCocktail, guess);
            return [
                fieldEmoji(row.cocktailName.isCorrect),
                arrayEmoji(row.ingredients),
                arrayEmoji(row.categories),
                fieldEmoji(row.alcoholic.isCorrect),
                fieldEmoji(row.glass.isCorrect),
            ].join("");
        }).join("\n");

        const text = `Boozle 🍸 - ${today}\n${resultLine}${grid ? `\n\n${grid}` : ""}`;

        navigator.clipboard.writeText(text).then(() => {
            setSnackbarOpen(true);
        }).catch(() => {
            // Fallback for non-HTTPS environments
            const textarea = document.createElement("textarea");
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            setSnackbarOpen(true);
        });
    };

    return (
        <div className="game-result-container">
            <Typography variant="h5" className="game-result-heading">
                {givenUp ? "Better luck tomorrow!" : "You got it! 🍸"}
            </Typography>

            <Typography variant="body1" className="game-result-subtext">
                {givenUp
                    ? `You used all your hints after ${guessCount} guess${guessCount !== 1 ? "es" : ""}`
                    : `Guessed in ${guessCount} ${guessCount === 1 ? "try" : "tries"}`
                }
            </Typography>

            <Button
                variant="outlined"
                startIcon={<ShareIcon />}
                onClick={handleShare}
                className="game-result-share-button"
            >
                Share
            </Button>

            <div className="game-result-countdown">
                <Typography variant="body2" className="game-result-countdown-label">
                    Next cocktail in
                </Typography>
                <Typography variant="h6" className="game-result-timer">
                    {timeLeft}
                </Typography>
            </div>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={() => setSnackbarOpen(false)}
                message="Result copied to clipboard!"
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            />
        </div>
    );
};

export default GameResult;
