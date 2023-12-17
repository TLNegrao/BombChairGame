const putEnterWinnerNumberRepository = require("../repositories/enterWinnerNumberRepository");

exports.enterWinnerNumberService = async (id, body) => {
  try {
    
    const gameId = id;
    const gameBody = body;
    
    const putGame = await putEnterWinnerNumberRepository.enterWinnerNumberRepository(gameId, gameBody);

    return putGame;
  } catch (error) {
    throw error;
  }
};