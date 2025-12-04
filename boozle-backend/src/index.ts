import express from 'express';
import cors from 'cors';
import dailyCocktailRoutes from './routes/dailyCocktail.js';
import searchCocktailsRoutes from './routes/searchAllCocktails.js';
import path from 'path';

// ----- Initialize App -----
const app = express();
const PORT = process.env.PORT || 3000;

// ----- Middleware -----
app.use(cors({
    origin: ['http://localhost:5173', 'https://boozledailygame-production.up.railway.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

app.use('/daily-cocktail', dailyCocktailRoutes);
app.use('/search-cocktails', searchCocktailsRoutes);

// ----- Serve Frontend in Production -----
const __dirname = path.resolve();
const frontendBuildPath = path.join(__dirname, '..', 'boozle-frontend', 'dist');
app.use(express.static(frontendBuildPath));

app.get('/*', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

// ----- Start Server -----
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});