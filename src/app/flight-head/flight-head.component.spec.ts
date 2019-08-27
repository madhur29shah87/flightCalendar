import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightHeadComponent } from './flight-head.component';

describe('FlightHeadComponent', () => {
  let component: FlightHeadComponent;
  let fixture: ComponentFixture<FlightHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightHeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
