const userIsPlaying = require('../models/game');
const existNumberGame = require('../models/game');

//valida se usuario já joga esta sala
exports.validateUserGameExist = async (body) => {
  userFound = await userIsPlaying.findOne({publicAddress: body.publicAddress});
  if(userFound){
    return true;
  }
  return false;
}

//valida se numero já eatá sendo jogado
exports.validateNumberGameExist = async (body) => {
    numberFound = await existNumberGame.findOne({chosenNumber: body.chosenNumber});
    if(numberFound){
      return true;
    }
    return false;
}