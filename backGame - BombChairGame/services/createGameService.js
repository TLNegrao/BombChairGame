const CreateGameRepository = require('../repositories/createGameRepository')

exports.createGameService = async (data) => {
  try {
    const gameParam = data;
    const createGame = await CreateGameRepository.createGameRepository(gameParam);
    
    return createGame;

  } catch (error) {
    throw error
  }

};