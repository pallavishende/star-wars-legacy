import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of }         from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';

import { FeedSystemDef } from './feedSystem.model';

@Injectable()
export class FeedSystemService {

  // Fake server get; for now
  getFeedSystemDef(): FeedSystemDef {
    let feedDef = new FeedSystemDef('abc' , 'egfr' , 'dfr' , 'tttt' ,4563 , '' , '', '' ,'' ,'' ,'', 0, '', '', false);
    return feedDef;
  }

  // Fake server update; assume nothing can go wrong
  updateSystem(feedSystemDef: FeedSystemDef): FeedSystemDef  {
    //const oldHero = heroes.find(h => h.id === hero.id);
    //const newHero = Object.assign(oldHero, hero);
    return feedSystemDef; // simulate latency with delay
  }

}
