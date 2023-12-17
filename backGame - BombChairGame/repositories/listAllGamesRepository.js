const Game = require("../models/game");

exports.listAllGamesRepository = async () => {
  try {
    const Games = await Game.find();
    // const Games = await Game.find({ closedGame: false });
    return Games;
  } catch (error) {
    throw error;
  }
};
