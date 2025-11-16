import express from 'express';
import cors from 'cors';
import { PrismaClient } from './generated/prisma/index.js';
import dailyCocktailRoutes from './routes/dailyCocktail.ts';
import searchCocktailsRoutes from './routes/searchAllCocktails.ts';

// ----- Initialize App -----
const app = express();
const prisma = new PrismaClient()

// ----- Middleware -----
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

app.use('/daily-cocktail', dailyCocktailRoutes);
app.use('/search-cocktails', searchCocktailsRoutes);

// ----- Start Server -----
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});