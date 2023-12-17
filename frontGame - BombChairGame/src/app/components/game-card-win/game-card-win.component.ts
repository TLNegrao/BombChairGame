import { Component, Input, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-card-win',
  templateUrl: './game-card-win.component.html',
  styleUrls: ['./game-card-win.component.scss']
})
export class GameCardWinComponent implements OnInit {


  @Input() gameId!: any | undefined;

  imageNumberMapping: any[] = [];
  games: any[] = [];
  processedResults: any[] = [];
  game: any;

  constructor(
    private gameS: GameService,
  ) { }


  ngOnInit(): void {
    this.gameS.getAllGames().subscribe((games) => {
      // Filtra apenas os jogos com openGame como true
      this.games = games.filter(game => game.closedGame === true);
    });

    this.gameS.getGameId(this.gameId).subscribe((game) => {
      this.game = game;
    });

  }


  
  isNumberAvailable(game: any, number: number): boolean {
    if (!game || !game.gameTickets) {
      return false;
    }

    const chosenNumbers = game.gameTickets.map((ticket: any) => ticket.chosenNumber);
    const winningNumber = game.winningNumber;

    const index = chosenNumbers.findIndex((chosenNumber: any) => chosenNumber === number);

    if (index === -1) {
      // O número não foi escolhido
      return true;
    }

    // O número foi escolhido
    return winningNumber !== number;
  }


}

