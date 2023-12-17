const { createGameController } = require('../../controllers/createGameController');
const CreateGameService = require('../../services/createGameService');
const CreateGameRepository = require('../../repositories/createGameRepository');

describe('createGameController', () => {
  it('should create a new game and return the saved game data', async () => {
    const mockGameParam = {
      publicAddress: 'mockPublicAddress',
      chosenNumber: 42,
      betAmount: 100,
      gameStartDate: new Date(),
      contractAddress: 'mockContractAddress',
    };

    const mockSavedGame = { /* mock game data */ };

    jest.spyOn(CreateGameService, 'createGameService').mockResolvedValueOnce(mockSavedGame);

    const req = { body: mockGameParam };
    const res = {
      send: jest.fn(),
    };

    await createGameController(req, res);

    expect(res.send).toHaveBeenCalledWith(mockSavedGame);
  });

  it('should handle errors and return a 400 status with the error message', async () => {
    const mockGameParam = {
      // invalid data for testing an error case
    };

    const errorMessage = 'Invalid game data';

    jest.spyOn(CreateGameService, 'createGameService').mockRejectedValueOnce(new Error(errorMessage));

    const req = { body: mockGameParam };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await createGameController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(errorMessage);
  });
});