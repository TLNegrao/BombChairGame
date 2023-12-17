import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-header-hall',
  templateUrl: './header-hall.component.html',
  styleUrls: ['./header-hall.component.scss']
})
export class HeaderHallComponent implements OnInit {

  @Output() sideNavToggled = new EventEmitter<boolean>();

  walletAddress: string = '';
  walletBalance: string = '';

  constructor(
    private web3: Web3Service,
    private rota: Router,
  ) { }

  ngOnInit(): void {
    this.getWalletAddress();
    this.getBalance();
  }

  async getWalletAddress() {
    try {
      this.walletAddress = await this.web3.getWalletAddress();
      this.web3.updateWalletAddress(this.walletAddress);
    } catch (error) {
      console.error('Erro ao obter o endereço da carteira:', error);
    }
  }

  async getBalance() {
    try {
      this.walletBalance = await this.web3.getBalance();
    } catch (error) {
      console.error('Erro ao obter o saldo da carteira:', error);
    }
  }
  

  disconnect(){
    localStorage.clear();
    localStorage.removeItem('wallet');
    alert('Usuário deslogado com sucesso!')
    this.rota.navigate(['home']);
  }

}
