const Game = require("../models/game");

exports.lossesPlayerWalletRepository = async (data) => {
  try {

    //jogos que publicAddress participa
    const listGameByIdLoose = await Game.find({ "gameTickets.publicAddress": data }).sort({ "gameTickets.publicAddress": -1 });

    const closedGame = listGameByIdLoose.filter(game => game.closedGame === true);

    //filtrar jogos onde data não é o vencedor
    const filteredGames = listGameByIdLoose.filter(game => game.publicWinnerAddress !== data);
    
    return filteredGames;
  } catch (error) {
    console.error("Repository - error", error);
    throw error;
  }
};