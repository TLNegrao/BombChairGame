const lossPlayerRepository = require('../repositories/lossesPlayerWalletRepository');

exports.lossesPlayerWalletService = async (body) => {

  try{

    const walletAddress = body;

    const lossPlayer = await lossPlayerRepository.lossesPlayerWalletRepository(walletAddress);

    return lossPlayer;
          
  } catch(error) {
   throw error;
  }
};