import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import type { Cocktail } from "../../models/cocktail";
import React, { useEffect } from "react";

type GuessComparisonProps = {
    guess: Cocktail | undefined;
}

type GuessRow = {
    name: string;
    ingredients: { name: string; measure: string; }[];
    categories: string[];
    alcoholic: string;
    glass: string;
}

const GuessComparison: React.FC<GuessComparisonProps> = ({guess}) => {
    const [rows, setRows] = React.useState<GuessRow[]>([]);

    useEffect(() => {
        if (!guess) return;

        const newRow: GuessRow = {
            name: guess.name,
            ingredients: guess.ingredients,
            categories: guess.categories,
            alcoholic: guess.isAlcoholic ? "Alcoholic" : "Non-Alcoholic",
            glass: guess.glassType
        };
        setRows((prevRows) => [...prevRows, newRow]);
    }, [guess]);
       

    return (
        <div className="guess-comparison-container">
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700}} aria-label="guess comparison table">
                    <TableHead>
                        <TableCell>Name</TableCell>
                        <TableCell>Ingredients</TableCell>
                        <TableCell>Categories</TableCell>
                        <TableCell>Alcoholic</TableCell>
                        <TableCell>Glass</TableCell>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow 
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">{row.name}</TableCell>
                                {/* <TableCell>{row.ingredients}</TableCell> */}
                                <TableCell>{row.categories}</TableCell>
                                <TableCell>{row.alcoholic}</TableCell>
                                <TableCell>{row.glass}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default GuessComparison;