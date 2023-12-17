const WinnerNumberGet = require("../services/winsPlayerService");

exports.getWinnerPlayerController = async (req, res) => {
  try {
    const { walletAddress } = req.body;

    const getWinner = await WinnerNumberGet.enterWinnerNumberService(walletAddress);

    return res.status(200).send(getWinner);
  } catch (error) {
    return res.status(500).send({
      // message: "Erro ao atualizar o jogo com id " + gameId.id,
      message: "Erro ao atualizar o jogo com id ",
    });
  }
};