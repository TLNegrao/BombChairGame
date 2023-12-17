export class gameTicket {
    publicAddress!: string;
    chosenNumber!: number;
}
  
export class game {
    idGame!: string;
    gameTickets!: gameTicket[];
    betAmount!: number;
    winningNumber!: number;
    gameStartDate!: Date;
    gameEndDate!: Date;
    openGame!: boolean;
    closedGame!: boolean;
  
    _id!: string;
    entry!: any;
    contractAddress!: string;
    publicWinnerAddress!: string;
}
  
export interface GameData {
    numerosDisponiveis: number[];
    chosenGameId: any;
    chosenNumber: any;
}