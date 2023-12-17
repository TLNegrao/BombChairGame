import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { game } from 'src/app/services/model/game.model';
import { Web3Service } from 'src/app/services/web3.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.scss']
})
export class HallComponent implements OnInit {

  selectedGameId: string | undefined;

  games: game[] = [];

  getIdGame!: any;

  sideNavStatus: boolean = false;

  constructor(
    private web3: Web3Service,
    private gameS: GameService,
  ) { }

  ngOnInit(): void {
    this.sideNavStatus = false;
    this.getAllGames();
    //Inicia o polling a cada 10 segundos
    // this.startPolling(10000);
  }
  

  getAllGames() {
    this.gameS.getAllGames().subscribe((games) => {
      this.games = games.filter(game => game.openGame === true);
    });
  }

  startPolling(interval: number) {
    this.gameS.startPolling(interval).subscribe((games) => {
      this.games = games.filter((game) => game.openGame === true);
    });
  }

  openModal(gameID: string) {
    this.selectedGameId = gameID;
    this.web3.changeGameId(gameID);
  }

}
