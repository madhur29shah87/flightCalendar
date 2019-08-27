import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FlightService {

  readonly country = "US";
  readonly currency = "USD";
  readonly locale = "en-US";
  readonly QUOTES_URL: string = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/" + this.country + "/" + this.currency + "/" + this.locale + "/";

  constructor(private http: HttpClient) { }

  getQuotes(selectedOrigin: string, selectedDestination: string, outboundpartialdate: string) {
    let tempUrl = this.QUOTES_URL + selectedOrigin + "/" + selectedDestination + "/" + outboundpartialdate;
    let headers = new HttpHeaders({
      "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      "x-rapidapi-key": "cb1422ffc0msh6c2795240f66f6ep176724jsn5cf289092410",
      "content-type": "application/x-www-form-urlencoded"
    });
    return this.http.get<any>(tempUrl, { headers: headers });
  }
}
