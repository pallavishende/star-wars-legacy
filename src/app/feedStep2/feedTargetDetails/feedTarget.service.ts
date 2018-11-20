import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { FeedTargetDef } from './feedTarget.model';

@Injectable()
export class FeedTargetService {

  constructor(private http: HttpClient) {}

  getFeedTargetDef(): FeedTargetDef {
    const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    const feedDef = new FeedTargetDef(random, null, '' , '' , '' , 0 , '' , '', '', '');
    return feedDef;
  }

  getExistingSystem(url: string) {
      return this.http.get<any>(url + '?' + new Date().getTime());
  }

  deleteFeedTarget(url, feedTargetObj) {
    return this.http.post(url, feedTargetObj);
  }


}
