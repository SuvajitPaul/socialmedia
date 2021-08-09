import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public searchData: BehaviorSubject<any> = new BehaviorSubject(null);
  //private searchData: Subject<any> = new Subject;

  constructor() { }
  //SEARCH DATA SET AS OBSERVABLE
  setSearchData(data: any) {
    this.searchData.next(data);
  }
  getSearchData() {
    return this.searchData;
  }
}
