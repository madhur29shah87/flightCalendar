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

  readonly ROOT_URL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/";
  readonly country = "US";
  readonly currency = "USD";
  readonly locale = "en-US";
  // QUOTES_URL: string = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/" + this.country + "/" + this.currency + "/" + this.locale + "/";
  ROUTE_URL: string = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/" + this.country + "/" + this.currency + "/" + this.locale + "/";

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
    let month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
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
    let tempUrl = this.ROUTE_URL + this.selectedOrigin + "/" + this.selectedDestination + "/" + this.outboundpartialdate;
    // this.http.get(this.ROOT_URL + 'dade2fea-2399-4627-9127-46b2dcd2ea47',
    //   { headers: headers, params: { 'originAirports': 'SIN', 'destinationAirports': 'KUL' } }).subscribe();

    this.http.get<any>(tempUrl, { headers: headers }).subscribe(data => this.sortData(data));
  }

  sortData(route) {
    let quoteArray: number[] = [];
    // let carriers = routes.Carriers;
    let quotes = route.Quotes;

    // let smallestQuote = quoteArray[0];
    // let legth = quoteArray.length;
    // for (let i = 1; i < length; i++) {
    //   if (quoteArray[i] < smallestQuote) {
    //     smallestQuote = quoteArray[i];
    //   }
    // }

    quotes.forEach(quote => {
      // quoteArray.push(quote.MinPrice);
      console.log('-->'+quote.MinPrice);
      this.allDates.forEach(element => {
        let dateData = element.filter(x => x.yyyymmdd === quote.OutboundLeg.DepartureDate.split('T')[0]);
        if(dateData[0]){
          dateData[0].flightPrice = quote.MinPrice;
        }
      });
    });

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
  changeOrigin(obj) {
    this.origin = obj;
    this.originDestValid();
  }

  changeDestination(obj) {
    this.destination = obj;
    this.originDestValid();
  }

  originDestValid() {
    if (this.origin != "Select Origin" && this.destination != "Select Destination") {
      this.invalidRoute = (this.origin == this.destination) ? true : false;
    }
  }

  // createArray(n: number): any[] {
  //   return Array(n);
  // }

  // dayCounter(val) {
  //   this.dateData.date = this.allDates[val].date;
  //   this.dateData.day = this.allDates[val].day;
  //   this.dayItem = val + 1;
  //   return this.dateData.date;
  // }

}
