import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
    const query = req.query.q as string;
    if (!query) {
        return res.status(400).json({ error: 'Missing search parameter' });
    }

    try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + req.query.q);
        const data = await response.json();
        res.json(data.drinks || []);

    } catch (error) {
        console.error('Error searching cocktails:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;