import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCardWinComponent } from './game-card-win.component';

describe('GameCardWinComponent', () => {
  let component: GameCardWinComponent;
  let fixture: ComponentFixture<GameCardWinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameCardWinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCardWinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
