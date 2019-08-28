import { Injectable, EventEmitter } from '@angular/core';
import { SearchData } from './searchData';

@Injectable({
  providedIn: 'root'
})
export class PassDataService {

  searchDataEmitter = new EventEmitter();
  // Dispatch data for other component
  dispatchEventData(searchData: SearchData){
    this.searchDataEmitter.emit(searchData);
  }

  constructor() { }
}
