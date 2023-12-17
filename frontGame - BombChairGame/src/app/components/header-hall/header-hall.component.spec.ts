import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderHallComponent } from './header-hall.component';

describe('HeaderHallComponent', () => {
  let component: HeaderHallComponent;
  let fixture: ComponentFixture<HeaderHallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderHallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderHallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
