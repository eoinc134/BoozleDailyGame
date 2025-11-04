import { Router }   from 'express';
import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();
const router = Router();

router.get('/', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize to midnight

        // Fetch the daily cocktail for today
        const cocktail = await prisma.dailyCocktail.findFirst({
            where: { date: today },
        });

        if (!cocktail) {
            res.status(404).json({ error: 'No cocktail found for today' });
            return;
        }

        res.json(cocktail);
    } catch (error) {
    console.error('Error fetching daily cocktail:', error);
    res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/fetch', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize to midnight

        // Check if today's cocktail already exists
        const existingCocktail = await prisma.dailyCocktail.findFirst({
            where: { date: today },
        });
        if (existingCocktail) {
            return res.status(200).json(existingCocktail);
        }

        // Fetch a random cocktail from the external API
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        const data = await response.json();
        const cocktailData = data.drinks[0];
        console.log('Fetched cocktail data:', cocktailData);

        //TODO: Format name, ingredients and imageUrl etc.

        // Save to DB
        const newCocktail = await prisma.dailyCocktail.create({
            data: {
                date: today,
                cocktailData: JSON.stringify(cocktailData),
            },
        });

        res.json(newCocktail);

    } catch (error) {
        console.error('Error fetching and saving daily cocktail:', error);
        res.status(500).json({ error: 'Failed to fetch daily cocktail' });
    }
});

export default router;