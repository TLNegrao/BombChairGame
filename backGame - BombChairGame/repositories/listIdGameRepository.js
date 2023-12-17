const GameModel = require("../models/game");

exports.listIdGameRepository = async (data) => {
  try {

    const listGameById = await GameModel.findById(data);
    
    return listGameById;
 

  } catch (error) {
    throw error;
  }
};