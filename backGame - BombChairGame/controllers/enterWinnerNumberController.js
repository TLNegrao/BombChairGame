const enterWinnerNumberPut = require("../services/enterWinnerNumberService");

exports.putEnterWinnerNumberController = async (req, res) => {
  const gameId = req.params.id;
  const gameBody = req.body;

  try {
    const updateGame = await enterWinnerNumberPut.enterWinnerNumberService(
      gameId,
      gameBody
    );

    return res.status(200).send(updateGame);
  } catch (error) {
    return res.status(500).send({
      message: "Erro ao atualizar o jogo com id " + gameId.id,
    });
  }
};