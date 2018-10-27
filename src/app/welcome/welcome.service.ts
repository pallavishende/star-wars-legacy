import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { IStarWars } from '../starWarsObject';

import {
  Observable,
  Subject,
  asapScheduler,
  pipe,
  of,
  from,
  interval,
  merge,
  fromEvent,
  BehaviorSubject
} from "rxjs";

@Injectable()
export class WelcomeService {

    baseUrl: string = '';
    constructor(private http: HttpClient) { }

    getCharacters(url): Observable<IStarWars> {
        return this.http.get(url)
        .do(data => console.log('Data received: '))
        .catch(this.handleError);
    }

    getMovies(url): Observable<any> {
        return this.http.get(url)
        .do(data => console.log('Data Recived: '))
        .catch(this.handleError);
    }

    getMovie(id: any): Observable<any> {
        if (id === '0') {

            return Observable.of(this.initializeProduct());
        };
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url)
            .do(data => console.log('getMovie: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        //console.error(error);
        return Observable.throw(error || 'Server error');
    }

    initializeProduct(): any {
      // Return an initialized object
      let id = Math.floor(Math.random() * Math.floor(1000));
      return {
          id: id,
          productName: null,
          productCode: null,
          category: null,
          tags: [],
          releaseDate: null,
          price: null,
          description: null,
          starRating: null,
          imageUrl: null
      };
  }


}
