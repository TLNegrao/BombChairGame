const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const gameTicketsSchema = mongoose.Schema({
  publicAddress: {
    type: String,
    required: true,
  },
  chosenNumber: {
    type: Number,
    required: true,
  },
});
const gameSchema = mongoose.Schema({
  publicWinnerAddress: {
    type: String
  },
  gameTickets: [
    gameTicketsSchema
  ],
  betAmount: {
    type: Number,
  },
  winningNumber: {
    type: Number,
  },
  gameStartDate: {
    type: Date,
    default: Date.now,
  },
  gameEndDate: {
    type: Date,
    
  },
  openGame: {
    type: Boolean,
    default: true, // O jogo começa aberto
  },
  closedGame: {
    type: Boolean,
    default: false, // O jogo começa fechado
  },
  gameCounter: {
    type: Number,
    default: 0, // Inicializa o contador em 0
  },
});

gameSchema.pre('save', async function(next) {
    // Verifica se o valor de closedGame mudou de false para true
    if (this.isModified('closedGame') && this.closedGame === true) {
        this.gameEndDate = new Date();
    }    
    next();
});


module.exports = mongoose.model("Game", gameSchema);
