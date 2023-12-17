import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { game } from 'src/app/services/model/game.model';
import { Web3Service } from 'src/app/services/web3.service';


@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {

  @ViewChild('closebutton') closebutton!: ElementRef;


  betAmount!: number;
  chosenNumber!: number;

  walletBalance: string = '';
  walletAddress: string = '';

  games: game[] = [];
  game!: any;
  transactionHash: any

  contractAddress: any;

  constructor(
    private web3: Web3Service,
    private gameS: GameService
  ) { }

  ngOnInit(): void {
  }

  resetModalData() {
    this.betAmount = 0;
    this.chosenNumber = 0;
  }

  closeModal() {
    this.resetModalData();
  }

  async getWalletAddress() {
    this.walletAddress = await this.web3.getWalletAddress();
    return this.walletAddress
  }


  async getBalance() {
    this.walletBalance = await this.web3.getBalance();
    return this.walletBalance
  }


  async newGameForm() {
    try {
      const saldo = await this.getBalance();
      const publicAddress = await this.getWalletAddress();

      const apostaData = {
        betAmount: this.betAmount,
        chosenNumber: this.chosenNumber,
        publicAddress: publicAddress,
        gameStartDate: new Date(),
        saldo: saldo
      };

      // Chama a função de criação de jogo no serviço web3
      const transaction = await this.web3.createNewGame(apostaData);

      // Verifica se a transação foi bem-sucedida (não cancelada)
      if (transaction.status === true) {
        await this.gameS.envioAposta(apostaData);//mongo

        if (this.closebutton) {
          this.closebutton.nativeElement.click();
        } else {
          console.error('Erro: this.closebutton não está definido.');
        }

        this.resetModalData();
        location.reload();
      } else {
        console.error('Transação cancelada pelo usuário.');
      }
    } catch (error) {
      console.error('Erro ao obter informações da carteira:', error);
    }

  }

}
