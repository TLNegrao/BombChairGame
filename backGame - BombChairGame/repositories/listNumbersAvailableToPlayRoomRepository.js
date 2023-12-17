const GameModel = require("../models/game");

exports.availableListNumbersGameRepository = async (data) => {
    try {
        const gameId = data;
        
        const game = await GameModel.findById(gameId);
        
        const chosenNumbers = game.gameTickets.map(ticket => ticket.chosenNumber);
        const allNumbers = Array.from({ length: 6 }, (_, i) => i + 1);
        
        const unavailableNumbers = chosenNumbers.filter(num => num >= 1 && num <= 6);
        const available = allNumbers.filter(num => !unavailableNumbers.includes(num));
        

        return available;
      } catch (error) {
        throw error;
      }
};