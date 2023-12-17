import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { error } from 'console';
import { Subscription } from 'rxjs';
import { GameService } from 'src/app/services/game.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-enter-game',
  templateUrl: './enter-game.component.html',
  styleUrls: ['./enter-game.component.scss']
})
export class EnterGameComponent implements OnInit {

  @ViewChild('closebutton') closebutton: any;


  private walletAddressSubscription!: Subscription;

  id!: any;
  idJogo!: any;
  games!: any;
  gameId: string = '';
  chosenNumber: any;
  publicAddress!: string;
  chosenGameId!: any;
  contractAddress!: any;
  contractAddresses!: any;
  contratoAddress!: string;

  betAmount!: number;

  constructor(
    private web3: Web3Service,
    private gameS: GameService,
  ) { }

  ngOnInit() {
    this.web3.currentGameId.subscribe(gameId => {
      this.gameId = gameId;
      this.numerosEscolhidos();


      this.walletAddressSubscription = this.web3.currentWalletAddress.subscribe(
        (walletAddress) => {
          this.publicAddress = walletAddress;
        });

    });

  }



  numerosEscolhidos(): void {
    this.gameS.getNumbersGameId(this.gameId).subscribe((res: any) => {
      this.chosenGameId = res;
    });
  }

  clear() {
    this.chosenNumber = null;
  }



  async upEnterGame2() {
    try {
      const playerChoice = {
        betAmount: 1,
        chosenNumber: this.chosenNumber,
        publicAddress: this.publicAddress,
      };
      const transacaoBlock = await this.web3.enterGame(playerChoice);

      if (transacaoBlock && transacaoBlock.status === true) {
        this.web3.logGameId(this.gameId);
        await this.gameS.upEnterGame(this.gameId, playerChoice).toPromise();
        await this.web3.getUltimoSorteio(this.gameId);
        alert('Aposta feita com sucesso!');
        this.closebutton?.nativeElement.click();
        location.reload();

      } else {
        // console.log('Algo deu errado')
      }

    } catch (erro: any) {
      // console.log('erro ao fazer aposta', error);
    }
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