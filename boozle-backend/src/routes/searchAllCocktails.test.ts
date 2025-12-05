import request from "supertest"
import express from "express"
import router from './searchAllCocktails';

describe('Cocktail Router', () => {
  let app: express.Express;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/cocktails', router);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns 400 if query parameter is missing', async () => {
    const response = await request(app).get('/cocktails');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Missing search parameter' });
  });

  it('returns data from external API', async () => {
    const mockDrinks = [{ idDrink: '123', strDrink: 'Mojito' }];

    // Mock global fetch
    globalThis.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ drinks: mockDrinks }),
    } as any);

    const response = await request(app).get('/cocktails?q=mojito');

    expect(globalThis.fetch).toHaveBeenCalledWith(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=mojito'
    );
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockDrinks);
  });

  it('returns empty array if API returns no drinks', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ drinks: null }),
    } as any);

    const response = await request(app).get('/cocktails?q=unknown');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('returns 500 if fetch throws an error', async () => {
    globalThis.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    const response = await request(app).get('/cocktails?q=mojito');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Internal server error' });
  });
});
