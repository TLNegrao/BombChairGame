const Game = require('../services/listAllGamesService')


exports.listAllGamesController = async (req, res) => {
  try {

    const listAllGames = await Game.listAllGamesService();

    res.status(200).json(listAllGames);

  } catch (error) {
    res.status(500).json({ erro: error.message})
  }
}