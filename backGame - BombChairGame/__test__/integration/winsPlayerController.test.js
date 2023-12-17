const { getWinnerPlayerController } = require('../../controllers/winsPlayerController');
const WinsPlayerService = require('../../services/winsPlayerService');
const WinsPlayerRepository = require('../../repositories/winsPlayerRepository');

describe('getWinnerPlayerController', () => {
  it('should return the winner player based on wallet address', async () => {
    const mockWalletAddress = 'mockWalletAddress';
    const mockWinIdGame = [{ /* mock game data */ }];

    jest.spyOn(WinsPlayerService, 'enterWinnerNumberService').mockResolvedValueOnce(mockWinIdGame);
    
    const req = { body: { walletAddress: mockWalletAddress } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await getWinnerPlayerController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(mockWinIdGame);
  });

  it('should handle errors', async () => {
    const mockWalletAddress = 'mockWalletAddress';
    const errorMessage = 'An error occurred';

    jest.spyOn(WinsPlayerService, 'enterWinnerNumberService').mockRejectedValueOnce(new Error(errorMessage));

    const req = { body: { walletAddress: mockWalletAddress } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await getWinnerPlayerController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ message: 'Erro ao atualizar o jogo com id ' });
  });
});