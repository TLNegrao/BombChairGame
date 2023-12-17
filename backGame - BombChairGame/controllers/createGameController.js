const createGame = require("../services/createGameService");

exports.createGameController = async (req, res) => {
  try {
    const gameParam = req.body;

    const saveGameBase = await createGame.createGameService(gameParam);

    return res.send(saveGameBase);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};