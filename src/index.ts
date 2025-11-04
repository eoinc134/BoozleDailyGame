import express from 'express';
import { PrismaClient } from './generated/prisma/index.js';
import dailyCocktailRoutes from './routes/dailyCocktail.ts';

const app = express();
const prisma = new PrismaClient()
app.use(express.json());

app.use('/daily-cocktail', dailyCocktailRoutes);

// ----- Start Server -----
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});