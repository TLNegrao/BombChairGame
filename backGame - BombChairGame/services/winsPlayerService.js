const ListGameByIdWinRepository = require("../repositories/winsPlayerRepository");

exports.enterWinnerNumberService = async (data) => {
  try {
    const winGameId = await ListGameByIdWinRepository.winIdGameRepository(data);

    return winGameId;
  } catch (error) {
    throw error;
  }
};