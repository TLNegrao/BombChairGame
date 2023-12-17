const lossPlayer = require("../services/lossesPlayerWalletService");

exports.lossesPlayerWalletController = async (req, res) => {
  try {
    
    const { walletAddress } = req.body;

    const lossesDatePlayer = await lossPlayer.lossesPlayerWalletService(walletAddress);

    return res.status(200).send(lossesDatePlayer);
    // res.status(200).json(lossesDatePlayer);

  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};