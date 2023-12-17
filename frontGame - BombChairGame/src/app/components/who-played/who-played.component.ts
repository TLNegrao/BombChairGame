import { Component, Input, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-who-played',
  templateUrl: './who-played.component.html',
  styleUrls: ['./who-played.component.scss']
})
export class WhoPlayedComponent implements OnInit {

  @Input() gameId!: string | undefined;

  idGame: any = [] = [];

  constructor(
    private gameS: GameService,
  ) { }

  ngOnInit(): void {
  }

  getGameId(_id: any){  
    this.gameS.getGameId(_id).subscribe((res: any) => {
      this.idGame = res;
    })
  }

  getTicketByNumber(numero: number): any {
    if (this.idGame.gameTickets && Array.isArray(this.idGame.gameTickets)) {
      return this.idGame.gameTickets.find((ticket: any) => ticket.chosenNumber === numero);
    }
    return null;
  }

}
