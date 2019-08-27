import { Injectable, EventEmitter } from '@angular/core';
import { SearchData } from './searchData';

@Injectable({
  providedIn: 'root'
})
export class PassDataService {

  searchDataEmitter = new EventEmitter();

  dispatchEventData(searchData: SearchData){
    this.searchDataEmitter.emit(searchData);
  }

  constructor() { }
}
