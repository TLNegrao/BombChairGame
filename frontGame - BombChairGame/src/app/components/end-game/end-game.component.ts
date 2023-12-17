import { Component, OnInit, ViewChild } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { game } from 'src/app/services/model/game.model';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-end-game',
  templateUrl: './end-game.component.html',
  styleUrls: ['./end-game.component.scss']
})
export class EndGameComponent implements OnInit {

  @ViewChild('closebutton') closebutton: any;

  sideNavStatus: boolean = false;

  walletAddress: string = '';

  betAmount!: number;
  chosenNumber!: number;

  walletBalance: string = '';

  games: game[] = [];
  game!: any;
  transactionHash: any

  constructor(
    private web3: Web3Service,
    private gameS: GameService,
  ) { }

  ngOnInit(): void {
    this.sideNavStatus = false;
    this.getWalletAddress();
  }

  async getWalletAddress() {
    try {
      this.walletAddress = await this.web3.getWalletAddress();
    } catch (error) {
      console.error('Erro ao obter o endereço da carteira:', error);
    }
  }

  resetModalData() {
    this.betAmount = 0;
    this.chosenNumber = 0;
  }


  winners: game[] = [];
  semVitoria: boolean = false;
  jogos:any;
  async winsPlayerWallet(){
    this.resetMessages();
    const walletAddress = await this.web3.getWalletAddress();
    this.gameS.getWinnerGameId({ walletAddress }).subscribe(
      (game) => {
        this.games = [...game]; // Cria uma cópia da matriz original
        this.semVitoria = true;
      },
      (error) => {
        console.error('Error in getWinnerGameId:', error);
        this.semVitoria = false;
      }
    );
  }


  losses: game[] = [];
  numeroDerrotas: boolean = false;
  async lossesPlayerWallet(){
    this.resetMessages();
    const walletAddress = await this.web3.getWalletAddress();
    this.gameS.getLossesPlayerWallet({ walletAddress }).subscribe(
      (game:any) => {
        this.games = [...game]; // Cria uma cópia da matriz original
        this.games = this.games.filter((game:any) => game.closedGame === true);
        this.numeroDerrotas = true;
      },
      (error) => {
        console.error('Error in getWinnerGameId:', error);
        this.numeroDerrotas = false;
      }
    );
  }

  
  semJogos: boolean = false;
  todos(){
    this.resetMessages();
  this.gameS.getAllGames().subscribe((games) => {
    const updatedGames = [...games].filter((game) => game.closedGame === true);
    this.games = updatedGames;
    this.semJogos = true;
  });
  }

  resetMessages() {
    this.semVitoria = false;
    this.numeroDerrotas = false;
    this.semJogos = false;
  }


  selectedGameId: string | undefined;
  openModal(gameID: string) {
    this.selectedGameId = gameID;
    this.web3.changeGameId(gameID);
  }

}
