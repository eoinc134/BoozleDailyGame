import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { evaluateGuess } from "../../services/guess-comparison-service";
import type { Cocktail } from "../../models/cocktail";
import type { GuessRow } from "../../models/guessRow";
import React, { useEffect } from "react";
import "./GuessComparison.css"

type GuessComparisonProps = {
    dailyCocktail: Cocktail;
    guess: Cocktail | undefined;
}

const GuessComparison: React.FC<GuessComparisonProps> = ({dailyCocktail, guess}) => {
    const [rows, setRows] = React.useState<GuessRow[]>([]);

    useEffect(() => {
        if (!guess) return;

        const newRow = evaluateGuess(dailyCocktail, guess)
        
        setRows((prevRows) => [newRow, ...prevRows]);
    }, [dailyCocktail, guess]);
       

    return ( 
        <>
        {rows.length > 0 && (
        <div className="guess-comparison-container">
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700, backgroundColor: "#242121"}} aria-label="guess comparison table">
                    <TableHead>
                        <TableCell sx={{color: "#ffffffff"}}>Name</TableCell>
                        <TableCell sx={{color: "#ffffffff"}}>Ingredients</TableCell>
                        <TableCell sx={{color: "#ffffffff"}}>Categories</TableCell>
                        <TableCell sx={{color: "#ffffffff"}}>Alcoholic</TableCell>
                        <TableCell sx={{color: "#ffffffff"}}>Glass</TableCell>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow 
                                key={row.cocktailName.value}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: "#242121" }}
                                >
                                <TableCell component="th" scope="row" sx={{ color: row.cocktailName.isCorrect ? "limegreen" : "red" }}>{row.cocktailName.value}</TableCell>
                                <TableCell>
                                    <ul style={{listStyle: "none", padding: 0, margin: 0}}>
                                        {row.ingredients.map((ingredient, index) => (
                                            <li  style={{ color: ingredient.isCorrect ? "limegreen" : "red" }} key={index}>{`${ingredient.value.toString()}`}</li>
                                        ))}
                                    </ul>
                                </TableCell>
                                <TableCell> 
                                    <ul style={{listStyle: "none", padding: 0, margin: 0}}>
                                        {row.categories.map((category, index) => (
                                            <li key={index}  style={{ color: category.isCorrect ? "limegreen" : "red" }}>{`${category.value.toString()}`}</li>
                                        ))}
                                    </ul>
                                </TableCell>
                                <TableCell sx={{ color: row.alcoholic.isCorrect ? "limegreen" : "red" }}>{row.alcoholic.value}</TableCell>
                                <TableCell sx={{ color: row.glass.isCorrect ? "limegreen" : "red" }}>{row.glass.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )}
    </>
    )
}

export default GuessComparison;