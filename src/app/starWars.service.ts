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
    private starObservable = new BehaviorSubject<IStarWars>(this.starwarobj);
    currentMessage = this.starObservable.asObservable();

    constructor() { }

    set(starwarobj){
      this.starwarobj = starwarobj
    }

    get():IStarWars{
      return this.starwarobj;
    }

    changeStarWarsObj(obj: any) {
        return this.starObservable.next(obj);
    }

}
