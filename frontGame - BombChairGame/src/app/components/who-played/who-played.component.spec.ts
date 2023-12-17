import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoPlayedComponent } from './who-played.component';

describe('WhoPlayedComponent', () => {
  let component: WhoPlayedComponent;
  let fixture: ComponentFixture<WhoPlayedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhoPlayedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhoPlayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
