# Boozle

**Boozle** is a Wordle-style daily cocktail guessing game. Players guess the daily cocktail based on progressive clues — a masked name, preparation instructions, and an image — and receive colour-coded feedback comparing each guess to the answer across name, ingredients, category, glass type, and alcohol content.

Built as a full-stack learning project, it demonstrates React, Express, PostgreSQL with Prisma, automated testing, and Railway deployment.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite, Material UI |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL, Prisma ORM |
| Testing | Vitest (frontend), Jest + Supertest (backend) |
| Code Quality | SonarCloud via GitHub Actions |
| Hosting | Railway |
| Design | [Figma](https://www.figma.com/design/8uUQI1Fv1JQ84igztlOIKM/Boozle?node-id=0-1&p=f&t=HormW9MVtCdlBOh9-0), Lucidchart |

---

## How It Works

1. A new cocktail is selected each day and stored in PostgreSQL.
2. Players type a cocktail name into the autocomplete input and submit guesses.
3. After each incorrect guess a clue is revealed:
   - **Clue 1** — Masked cocktail name (first letter of each word shown)
   - **Clue 2** — Preparation instructions
   - **Clue 3** — Cocktail image
4. Each guess appears in a comparison table with green/red feedback per field.
5. Players can also hit **Give Up** after three hints to reveal the answer.

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/daily-cocktail` | Returns today's cocktail |
| `POST` | `/daily-cocktail/fetch` | Seeds today's cocktail (calls TheCocktailDB) |
| `GET` | `/search-cocktails?q={query}` | Searches cocktails by name (proxies TheCocktailDB) |

---

## Local Development

### Prerequisites

- Node.js 20+
- PostgreSQL database
- A `.env` file in `boozle-backend/` with `DATABASE_URL`
- A `.env` file in `boozle-frontend/` with `VITE_API_BASE_URL`

### Backend

```bash
cd boozle-backend
npm install
npx prisma migrate dev
npm run dev
```

### Frontend

```bash
cd boozle-frontend
npm install
npm run dev
```

The frontend dev server runs on `http://localhost:5173` and proxies API requests to the backend.

### Seeding the Daily Cocktail

After starting the backend, POST to `/daily-cocktail/fetch` once to seed today's cocktail:

```bash
curl -X POST http://localhost:3000/daily-cocktail/fetch
```

---

## Running Tests

```bash
# Backend
cd boozle-backend && npm test

# Frontend
cd boozle-frontend && npm test
```

---

## Deployment

The app is hosted on Railway. The `start.sh` script handles the full build and start sequence:

1. Builds the frontend (`vite build`)
2. Compiles the backend TypeScript (`tsc`)
3. Starts the Express server, which also serves the frontend as static files
