import { Injectable } from '@angular/core';
import { HeaderFooter } from '../feedStep2/headerFooter.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class FeedStep2Service {

  constructor(private http: HttpClient) {}

  // Fake server get; for now
  getFeedDef(url:string) {
      return this.http.get<any>(url + '?' + new Date().getTime());
  }

  getExistingSystem(url:string) {
      return this.http.get<any>(url + '?' + new Date().getTime());
  }

  getSourceFeedTypes(url:string) {
      return this.http.get<any>(url + '?' + new Date().getTime());
  }

  getSourceFeed(url:string) {
      return this.http.get<any>(url + '?' + new Date().getTime());
  }

  getCalendar(url:string) {
      return this.http.get<any>(url);
  }

  postFeed(url, feedObj):any {
	return this.http.post(url, feedObj);
  }

  // Fake server update; assume nothing can go wrong
/*
  updateFeed(feedDetails: FeedDetails): FeedDetails  {
    //const oldHero = heroes.find(h => h.id === hero.id);
    //const newHero = Object.assign(oldHero, hero);
    return feedDetails; // simulate latency with delay
  }
*/
}
