import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IStarWars } from './starWarsObject';

@Injectable({
    providedIn: 'root',
  })

export class StarWarsService {

    starwarobj:IStarWars = undefined;

    /*{
      name: '',
      urlDetails: '',
      releaseDate: new Date,
      height: '',
      films: [],
      mass: '',
      hair_color: '',
      skin_color: '',
      eye_color: '',
      birth_year: '',
      gender: '',
      homeworld: '',
      created: '',
      edited: '',
      url: ''
    };
*/
    private starObservable = new BehaviorSubject<IStarWars>(this.starwarobj);
    currentMessage = this.starObservable.asObservable();

    constructor() { }

    set(starwarobj){
      this.starwarobj = starwarobj
    }


    get(){
      return this.starwarobj;
    }


    changeStarWarsObj(obj: any) {
        //console.log('currentMessage: ' + JSON.stringify(obj))
        return this.starObservable.next(obj);
    }

}
