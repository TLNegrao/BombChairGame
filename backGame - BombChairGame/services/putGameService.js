const putGameRepository = require("../repositories/putGameRepository");

exports.putGameService = async (id, body) => {
  try {
    
    const gameId = id;
    const gameBody = body;

    const putGame = await putGameRepository.putGameRepository(gameId, gameBody);

    return putGame;
  } catch (error) {
    throw error;
  }
};
