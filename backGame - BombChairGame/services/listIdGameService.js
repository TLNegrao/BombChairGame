const ListGameByIdRepository = require("../repositories/listIdGameRepository");

exports.listIdGameService = async (data) => {
  try {
    // const userId = data;
    const listGameId = await ListGameByIdRepository.listIdGameRepository(data);

    return listGameId;
  } catch (error) {
    throw error;
  }
};