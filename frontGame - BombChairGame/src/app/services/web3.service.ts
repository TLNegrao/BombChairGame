import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { GameService } from './game.service';

declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private web3!: Web3;
  private defaultAccount!: string;
  private contract!: Contract;

  private gameIdSource = new BehaviorSubject<string>('');
  currentGameId = this.gameIdSource.asObservable();

  private walletAddressSource = new BehaviorSubject<string>('');
  currentWalletAddress = this.walletAddressSource.asObservable();

  private winnerAnnouncedSource = new BehaviorSubject<any>(null);
  winnerAnnounced$ = this.winnerAnnouncedSource.asObservable();

  private BombChairGame: string = '0x17D350E869820c41eD122C28b0F737Cee0c6Ab23';
  GAMEABI = require('./contract/ABI.json');

  constructor(
    private gameS: GameService,
  ) {
    this.web3 = new Web3('http://127.0.0.1:7545')
    if (window.ethereum) {
      this.web3 = new Web3(window.ethereum);
      this.contract = new this.web3.eth.Contract(this.GAMEABI, this.BombChairGame);
    } else {
      console.error('Web3 provider not available.');
    }
  }

  async conetcTeste() {
    if (!window.ethereum)
    alert('Instale a metamask -> https://metamask.io/download\n tutorial acesse -> https://www.youtube.com/watch?v=A7sbpFvkEe0 ');
      // throw new Error('Metamask não encontrada!');

    const web3 = new Web3(window.ethereum);
    const contas = await web3.eth.requestAccounts();
    if (!contas || !contas.length) throw new Error('Conta não encontrada ou não permitida');

    return contas[0];
  }

  async getWalletAddress(): Promise<string> {
    if (!window.ethereum) {
      throw new Error('MetaMask not found.');
    }
    try {
      // Obter o endereço da carteira conectada
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length === 0) {
        throw new Error('No accounts found.');
      }

      // return accounts[0];
      const formattedAddress = Web3.utils.toChecksumAddress(accounts[0]);

      return formattedAddress;

    } catch (error) {
      console.error('Erro ao obter o endereço da carteira:', error);
      throw error;
    }
  }


  async getBalance() {
    try {
      const defaultAccount = await this.getWalletAddress();
      if (defaultAccount) {
        const balanceWei = await this.web3.eth.getBalance(defaultAccount);
        const balanceEther = this.web3.utils.fromWei(balanceWei, 'ether');
  
        return balanceEther;
      } else {
        return '0';
      }
    } catch (error) {
      console.error('Error getting balance:', error);
      throw error;
    }
  }


  changeGameId(gameId: string) {
    this.gameIdSource.next(gameId);
  }

  updateWalletAddress(walletAddress: string) {
    this.walletAddressSource.next(walletAddress);
  }

  async createNewGame(apostaData: any) {
    try {
      const transaction = await this.contract.methods.criarNovaInstanciaJogo(apostaData.chosenNumber).send({
        from: apostaData.publicAddress,
        value: this.web3.utils.toWei(apostaData.betAmount.toString(), 'ether')
      });
      return transaction
    } catch (error) {
      if (error === 4001) {
        console.error('Transação cancelada pelo usuário.');
        return { status: false, error: 'Transação cancelada pelo usuário.' };
      } else {
        console.error('Erro ao criar um novo jogo: ', error);
        throw error;
      }
    }
  }

  async enterGame(playerChoice: any) {
    try {
      const contract = new this.web3.eth.Contract(this.GAMEABI, this.BombChairGame);
      const transaction = await contract.methods.jogar(playerChoice.chosenNumber).send({
        from: playerChoice.publicAddress,
        value: this.web3.utils.toWei(playerChoice.betAmount.toString(), 'ether')
      });
      return transaction
    } catch (error) {
      if (error === 4001) {
        console.error('Transação cancelada pelo usuário.');
        return { status: false, error: 'Transação cancelada pelo usuário.' };
      } else {
        console.error('Erro ao criar um novo jogo: ', error);
        throw error;
      }
    }
  }



  games!: any;
  getAllGames() {
    this.gameS.getAllGames().subscribe((game) => {
      this.games = game;
      const gameId = this.games[0]._id;

      this.getUltimoSorteio(gameId);

      return gameId;

    });

  }


  async getUltimoSorteio(gameId: any): Promise<any> {
    try {
      const sorteio = await this.contract.methods.ultimoSorteio().call();
      const numeroSorteado = parseInt(sorteio[0], 10);
      const vencedor = sorteio[1];
      const contador = parseInt(sorteio[3], 10);

      if (contador === 0) {
        await this.gameS.upEnterWin(gameId, {
          winningNumber: numeroSorteado,
          publicWinnerAddress: vencedor,
        }).toPromise();
      }

      return sorteio
    } catch (error) {
      console.error('Erro ao obter o último sorteio: ', error);
      throw error;
    }
  }

  logGameId(gameId: any) {
    const atual = gameId
    return atual;
  }

}
