import { Component, OnInit } from '@angular/core';
import { DateData } from '../dateData';
import { FlightService } from '../flight.service';
import { PassDataService } from '../pass-data.service';

@Component({
  selector: 'app-flight-calendar',
  templateUrl: './flight-calendar.component.html',
  styleUrls: ['./flight-calendar.component.css']
})
export class FlightCalendarComponent implements OnInit {

  rows: number[] = [0, 1, 2, 3, 4];
  columns: number[] = [0, 1, 2, 3, 4, 5, 6];
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  dayItem: number = 0;
  selectedOrigin: string;
  selectedDestination: string;
  outboundpartialdate: string = this.getTodaysDate();
  dateData: DateData = null;
  // Created 2 dimensional array to so that it would be easy to populate data and generate divs in 7 column and 5 rows
  allDates: DateData[][] = [];

  constructor(private flightService: FlightService, private passDataService: PassDataService) { }

  ngOnInit() {
    // Subscribe / listen to receive data provided by search dropdown fields on search click (which is inside flight-head component)
    this.passDataService.searchDataEmitter.subscribe(
      (searchData) => {
        this.selectedOrigin = searchData.selectedOrigin;
        this.selectedDestination = searchData.selectedDestination;
        this.getFlightDetail();
      });
    this.getDates();
  }

  getTodaysDate(): string {
    let date = new Date();
    return this.getyyyymmdd(date);
  }

  // Convert date to yyyy-mm-dd format.
  getyyyymmdd(date) {
    // if date month is less than 10 then appending 0 - this is done as api doesnt accept single digit number
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    // added month + 1 as month starts from 0
    let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    let year = date.getFullYear();
    return year + "-" + month + "-" + day;
  }


  getFlightDetail() {
    // Used flight service to do the get call to fetch data for all dates
    this.flightService.getQuotes(this.selectedOrigin, this.selectedDestination, this.outboundpartialdate).subscribe(
      (data) => {
        this.sortData(data);
      },
      (error) => {
        // Error not handled but could be shown into dialog
      }
    );
  }

  sortData(quotes) {
    if (quotes && quotes.Quotes && quotes.Quotes.length > 0) {
      quotes.Quotes.forEach(quote => {
        this.allDates.forEach(element => {
          // fliter used to find matching date
          let dateData = element.filter(x => x.yyyymmdd === quote.OutboundLeg.DepartureDate.split('T')[0]);
          if (dateData[0]) {
            // when date matches price is set to relevant dateData object
            dateData[0].flightPrice = quote.MinPrice;
          }
        });
      });
    }
    let nextDate = new Date(this.outboundpartialdate);
    if (nextDate < (new Date(this.allDates[4][6].yyyymmdd))) {
      nextDate.setDate(nextDate.getDate() + 1);
      this.outboundpartialdate = this.getyyyymmdd(nextDate);
      // called recursively to get data for all dates as service return data for 1 date
      this.getFlightDetail();
    } else {
      this.outboundpartialdate = this.getTodaysDate();
    }
  }

  // Logic to create next 35 dates from todays date (7 columns * 5 rows)
  // Exact 30 days could be acieved .. but will required more efforts.
  getDates() {
    let day = new Date();
    let j = 0;
    let k = 0;
    for (let i = 0; i < 35; i++) {
      this.allDates.push();
      let nextDay = new Date();
      // nextDay.setDate(day.getDate() + i);
      this.dateData = new DateData();
      // this.dateData.todaysDay = 
      nextDay.setDate(day.getDate() + i);
      let yyyymmdd = this.getyyyymmdd(nextDay);
      this.dateData.date = nextDay.getDate();
      this.dateData.day = nextDay.getDay();
      this.dateData.month = nextDay.getMonth();
      this.dateData.yyyymmdd = yyyymmdd;
      this.allDates[j] = (!this.allDates[j]) ? [] : this.allDates[j];
      this.allDates[j][k] = this.dateData;
      k++;
      if (k == 7) {
        k = 0;
        j++;
      }
    }
  }

}
