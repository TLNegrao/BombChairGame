const { lossesPlayerWalletController } = require('../../controllers/lossesPlayerWalletController');
const LossesPlayerWalletService = require('../../services/lossesPlayerWalletService');
const LossesPlayerWalletRepository = require('../../repositories/lossesPlayerWalletRepository');

describe('lossesPlayerWalletController', () => {
  it('should return the list of games where the player lost based on wallet address', async () => {
    const mockWalletAddress = 'mockWalletAddress';
    const mockLossesGames = [{ /* mock game data */ }];

    jest.spyOn(LossesPlayerWalletService, 'lossesPlayerWalletService').mockResolvedValueOnce(mockLossesGames);

    const req = { body: { walletAddress: mockWalletAddress } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await lossesPlayerWalletController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(mockLossesGames);
  });

  it('should handle errors', async () => {
    const mockWalletAddress = 'mockWalletAddress';
    const errorMessage = 'An error occurred';

    jest.spyOn(LossesPlayerWalletService, 'lossesPlayerWalletService').mockRejectedValueOnce(new Error(errorMessage));

    const req = { body: { walletAddress: mockWalletAddress } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await lossesPlayerWalletController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ erro: errorMessage });
  });
});