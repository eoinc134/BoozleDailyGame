import express from 'express';
import { PrismaClient } from './generated/prisma/index.js';
import dailyCocktailRoutes from './routes/dailyCocktail.ts';

// ----- Initialize App -----
const app = express();
const prisma = new PrismaClient()

// ----- Middleware -----
app.use(express.json());
app.use('/daily-cocktail', dailyCocktailRoutes);

// ----- Start Server -----
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});