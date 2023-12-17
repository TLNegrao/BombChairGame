import { Component, Input, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-who-is-playing',
  templateUrl: './who-is-playing.component.html',
  styleUrls: ['./who-is-playing.component.scss']
})
export class WhoIsPlayingComponent implements OnInit {

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




  mouseSobreApostar: boolean = false;
  mouseSobreCancelar: boolean = false;
  mouseOverApostar() {
    this.mouseSobreApostar = true;
  }
  mouseOverCancelar() {
    this.mouseSobreCancelar = true;
  }
  mouseLeaveApostar() {
    this.mouseSobreApostar = false;
  }
  mouseLeaveCancelar() {
    this.mouseSobreCancelar = false;
  }


}
