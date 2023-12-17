const listAllGamesRepository = require("../repositories/listAllGamesRepository");

exports.listAllGamesService = async () => {
  try {
    const listGames = await listAllGamesRepository.listAllGamesRepository();

    return listGames;
  } catch (error) {
    throw error;
  }
};