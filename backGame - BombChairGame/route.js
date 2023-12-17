const express = require('express');
const router = express.Router();

const createUser = require('./controllers/createUserController');
router.post('/api/v1/register', createUser.createUserController);

const createGame = require('./controllers/createGameController');
router.post('/api/v1/aposta/', createGame.createGameController);

const getGames = require('./controllers/ListAllGamesController');
router.get('/api/v1/getGames', getGames.listAllGamesController);

const getIdGame = require('./controllers/listIdGameController');
router.get('/api/v1/getGames/:id', getIdGame.listIdGameController);

const enterUserGame = require('./controllers/putGameController');
router.put('/api/v1/enterGame/:id', enterUserGame.putGameController);

const availableListNumbers = require('./controllers/listNumbersAvailableToPlayRoomController');
router.get('/api/v1/availableNumbers/:id', availableListNumbers.listOfAvailableRoomNumbersController);

//inserir número sorteado e endereço vencedor
const enterWinnerNumber = require('./controllers/enterWinnerNumberController');
router.put('/api/v1/enterWinnerNumber/:id', enterWinnerNumber.putEnterWinnerNumberController);

//rota para ver vitorias jogador
const getWinnerPlayer = require('./controllers/winsPlayerController');
router.post('/api/v1/getWinnerGameId/', getWinnerPlayer.getWinnerPlayerController);

//rota para ver derrotas jogador
const getLossesPlayerWallet = require('./controllers/lossesPlayerWalletController');
router.post('/api/v1/lossesPlayerWallet/', getLossesPlayerWallet.lossesPlayerWalletController);

module.exports = router