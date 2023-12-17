const createGameSchema = require("../models/game");

exports.createGameRepository = async (data) => {

  try {
    const gameTickets = [
      {
        publicAddress: data.publicAddress,
        chosenNumber: data.chosenNumber,
      },
    ];
    const createGame = new createGameSchema({
      gameTickets: gameTickets,
      betAmount: data.betAmount,
      gameStartDate: data.gameStartDate,
      gameCounter: 1,
      contractAddress: data.contractAddress,
    });
    const saveGame = await createGame.save();
    return saveGame;
  } catch (error) {
    throw error;
  }
};