import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightCalendarComponent } from './flight-calendar.component';

describe('FlightCalendarComponent', () => {
  let component: FlightCalendarComponent;
  let fixture: ComponentFixture<FlightCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
