const { listAllGamesController } = require('../../controllers/ListAllGamesController');
const Game = require('../../models/game');

describe('listAllGamesController', () => {
  it('should return a list of games', async () => {
    const mockGames = [{ /* mock game data */ }];
    
    jest.spyOn(Game, 'find').mockResolvedValueOnce(mockGames);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await listAllGamesController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockGames);
  });

  it('should handle errors', async () => {
    const errorMessage = 'An error occurred';
    
    jest.spyOn(Game, 'find').mockRejectedValueOnce(new Error(errorMessage));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await listAllGamesController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ erro: errorMessage });
  });
});