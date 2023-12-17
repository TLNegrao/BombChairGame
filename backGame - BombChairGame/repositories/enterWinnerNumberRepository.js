const Game = require("../models/game");

exports.enterWinnerNumberRepository = async (id, body) => {
    try {

      const existingGame = await Game.findById(id);
      if (!existingGame) {
        throw new Error("Jogo não encontrado!");
      }  
  
        if (existingGame.openGame === false) {
          existingGame.publicWinnerAddress = body.publicWinnerAddress;
          existingGame.winningNumber = body.winningNumber;
        }
  
  
        await existingGame.save();
  
      return existingGame;
    } catch (error) {
      throw error;
    }

  };