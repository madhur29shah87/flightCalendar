import { Component, OnInit } from '@angular/core';
import { DateData } from '../dateData';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-flight-calendar',
  templateUrl: './flight-calendar.component.html',
  styleUrls: ['./flight-calendar.component.css']
})
export class FlightCalendarComponent implements OnInit {
  origin: string = "Select Origin";
  destination: string = "Select Destination";
  invalidRoute: boolean = false;
  rows: number[] = [0, 1, 2, 3, 4];
  columns: number[] = [0, 1, 2, 3, 4, 5, 6];
  days: String[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  dayItem: number = 0;

  locationSelected: boolean = false;

  readonly ROOT_URL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/";
  readonly country = "US";
  readonly currency = "USD";
  readonly locale = "en-US";
  QUOTES_URL: string = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/" + this.country + "/" + this.currency + "/" + this.locale + "/";
  //ROUTE_URL: string = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/" + this.country + "/" + this.currency + "/" + this.locale + "/";

  selectedOrigin: String = "SIN";
  selectedDestination: String = "KUL";

  outboundpartialdate: string = this.getTodaysDate();

  quiteDetails: {
    flightNumber: number,
    price: number,
    flightName: string
  };

  getTodaysDate(): string {
    let date = new Date();
    return this.getyyyymmdd(date);
  }

  getyyyymmdd(date) {
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    let year = date.getFullYear();
    return year + "-" + month + "-" + day;
  }
  // outboundpartialdate: string = "2019-08-27";

  browsequotes: any;

  // posts: Observable<any>;


  getFlightDetail() {
    // let params = new HttpParams();
    let headers = new HttpHeaders({
      "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      "x-rapidapi-key": "cb1422ffc0msh6c2795240f66f6ep176724jsn5cf289092410",
      "content-type": "application/x-www-form-urlencoded"
    });
    let tempUrl = this.QUOTES_URL + this.selectedOrigin + "/" + this.selectedDestination + "/" + this.outboundpartialdate;
    // this.http.get(this.ROOT_URL + 'dade2fea-2399-4627-9127-46b2dcd2ea47',
    //   { headers: headers, params: { 'originAirports': 'SIN', 'destinationAirports': 'KUL' } }).subscribe();

    // this.http.get<any>(tempUrl, { headers: headers }).subscribe(data => this.sortData(data));
    this.http.get<any>(tempUrl, { headers: headers }).subscribe((response) => {
      this.sortData(response);
    },
      (error) => {
        console.log('------->' + error.message);
      });
  }

  sortData(quotes) {
    let quoteArray: number[] = [];
    // let quotes = route.Quotes;
    if (quotes && quotes.Quotes && quotes.Quotes.length > 0) {
      quotes.Quotes.forEach(quote => {
        // quoteArray.push(quote.MinPrice);
        console.log('-->' + quote.MinPrice);
        this.allDates.forEach(element => {
          let dateData = element.filter(x => x.yyyymmdd === quote.OutboundLeg.DepartureDate.split('T')[0]);
          if (dateData[0]) {
            dateData[0].flightPrice = quote.MinPrice;
          }
        });
      });
    }
    let nextDate = new Date(this.outboundpartialdate);
    if (nextDate < (new Date(this.allDates[4][6].yyyymmdd))) {
      nextDate.setDate(nextDate.getDate() + 1);
      this.outboundpartialdate = this.getyyyymmdd(nextDate);
      this.getFlightDetail();
    } else {
      this.outboundpartialdate = this.getTodaysDate();
    }
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getDates();
  }

  dateData: DateData = null;
  allDates: DateData[][] = [];

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
  changeOrigin(event) {
    this.origin = event.target.innerText;
    this.selectedOrigin = event.target.value;
    this.originDestValid();
  }

  changeDestination(event) {
    this.destination = event.target.innerText;
    this.selectedDestination = event.target.value;
    this.originDestValid();
  }

  originDestValid() {
    if (this.origin != "Select Origin" && this.destination != "Select Destination") {
      this.invalidRoute = (this.origin === this.destination) ? true : false;
      this.locationSelected = (this.origin !== this.destination);
    }
  }

}
