const Game = require("../models/game");

exports.putGameRepository = async (id, body) => {
  try {
    const existingGame = await Game.findById(id);
    if (!existingGame) {
      throw new Error("Jogo não encontrado!");
    }

    // Verificar se o jogador já está participando do jogo
    const playerAlreadyExists = existingGame.gameTickets.some(
      (ticket) => ticket.publicAddress === body.publicAddress
    );
    if (playerAlreadyExists) {
      throw new Error("Jogador já está jogando!");
    }

    // Verificar se o número já foi escolhido por outro jogador
    const numberAlreadyChosen = existingGame.gameTickets.some(
      (ticket) => ticket.chosenNumber === body.chosenNumber
    );
    if (numberAlreadyChosen) {
      throw new Error("Número já foi escolhido!");
    }

    // Verifique se o jogo está aberto e o contador não atingiu 6 antes de adicionar um novo bilhete
    if (existingGame.openGame && existingGame.gameCounter < 6) {
      existingGame.gameTickets.push({
        publicAddress: body.publicAddress,
        chosenNumber: body.chosenNumber,
      });

      // Atualize o contador e o status de fechamento se necessário
      existingGame.gameCounter += 1;
      if (existingGame.gameCounter === 6) {
        existingGame.openGame = false;
        existingGame.closedGame = true;
      }

      await existingGame.save();
    }

    return existingGame;
  } catch (error) {
    throw error;
  }
};