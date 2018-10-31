import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { IStarWars } from '../starWarsObject';
import { movieDetails } from '../moviesObject';

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
  StarDetail: IStarWars;
  arrayOfFilms = [];
  movieObj: movieDetails;
  baseUrl: string = '';
  constructor(private http: HttpClient) { }

  getCharacters(url): Observable<IStarWars> {
    return this.http.get(url)
    .do(data => console.log('Data received: '+ JSON.stringify(data)))
    .catch(this.handleError);
  }

  private handleError(error: Response): Observable<any> {
    return Observable.throw(error || 'Server error');
  }

}
