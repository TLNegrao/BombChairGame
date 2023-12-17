import { Component, Input, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';


@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {

  @Input() gameId!: any | undefined;

  chosenGameId!: any;

  teste!:any;

  imageNumberMapping: any = [];

  constructor(
    private gameS: GameService,
  ) {
    for (let i = 1; i <= 6; i++) {
      const mapping = {
        numbers: [i], //números para cada imagem
        imageToShow: `${i}b.png`,
        imageToHide: `${i}a.png`,
      };
      this.imageNumberMapping.push(mapping);
    }
  }


  ngOnInit(): void {
    this.gameS.getGameId(this.gameId).subscribe((game) => {
      this.numerosDisponiveis();
    });
  };

  
  numerosDisponiveis(): void {
    this.gameS.getNumbersGameId(this.gameId).subscribe((res: any) => {
      this.chosenGameId = res;
    });
  };


  isAnyNumberAvailable(numbers: number[]): boolean {
    return numbers.some(num => this.chosenGameId?.includes(num));
  }

}