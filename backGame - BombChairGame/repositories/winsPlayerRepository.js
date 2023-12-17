const GameModel = require("../models/game");

exports.winIdGameRepository = async (data) => {
  try {

    const listGameByIdWin = await GameModel.find({ publicWinnerAddress: data }).sort({ publicWinnerAddress: -1 });
    
    return listGameByIdWin;
 

  } catch (error) {
    console.error("Repository - error", error);
    throw error;
  }
};