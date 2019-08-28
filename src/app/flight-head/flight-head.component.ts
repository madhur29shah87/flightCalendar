import { Component, OnInit } from '@angular/core';
import { SearchData } from '../searchData';
import { PassDataService } from '../pass-data.service';

@Component({
  selector: 'app-flight-head',
  templateUrl: './flight-head.component.html',
  styleUrls: ['./flight-head.component.css']
})
export class FlightHeadComponent implements OnInit {
  origin: string = "Select Origin";
  destination: string = "Select Destination";
  invalidRoute: boolean = false;
  locationSelected: boolean = false;
  selectedOrigin: string;
  selectedDestination: string;
  searchData: SearchData;

  constructor(private passDataService: PassDataService) { }

  ngOnInit() {
  }

  searchFlight() {
    this.searchData = new SearchData();
    this.searchData.selectedOrigin = this.selectedOrigin;
    this.searchData.selectedDestination = this.selectedDestination;
    // calling service to emit data to other components
    this.passDataService.dispatchEventData(this.searchData);
  }

  changeOrigin(event) {
    this.origin = event.target.innerText;
    this.selectedOrigin = event.target.value;
    this.originDestValidate();
  }

  changeDestination(event) {
    this.destination = event.target.innerText;
    this.selectedDestination = event.target.value;
    this.originDestValidate();
  }

  originDestValidate() {
    if (this.origin != "Select Origin" && this.destination != "Select Destination") {
      // show hide error message.
      this.invalidRoute = (this.origin === this.destination) ? true : false;
      // disable search button if both location are same / not selected
      this.locationSelected = (this.origin !== this.destination);
    }
  }

}
