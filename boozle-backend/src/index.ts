import express from 'express';
import cors from 'cors';
import { PrismaClient } from './generated/prisma/index.js';
import dailyCocktailRoutes from './routes/dailyCocktail';
import searchCocktailsRoutes from './routes/searchAllCocktails';

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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});