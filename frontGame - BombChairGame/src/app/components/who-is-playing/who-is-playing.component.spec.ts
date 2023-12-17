import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoIsPlayingComponent } from './who-is-playing.component';

describe('WhoIsPlayingComponent', () => {
  let component: WhoIsPlayingComponent;
  let fixture: ComponentFixture<WhoIsPlayingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhoIsPlayingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhoIsPlayingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
