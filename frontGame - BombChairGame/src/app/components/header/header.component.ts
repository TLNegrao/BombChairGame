import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private web3: Web3Service,
    private rota: Router
  ) { }

  ngOnInit(): void {
  }

  connect() {
    this.web3.conetcTeste().then(response => {
      console.log('vem daqui',response);
      this.rota.navigate(['hall']);
    }).catch((error: any) => {
      console.error(error);
    });
  }

}
