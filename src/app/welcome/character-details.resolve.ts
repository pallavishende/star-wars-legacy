import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/mergeMap';


import { StarWarsService } from '../starWars.service';
import { IStarWars } from '../starWarsObject';
import { movieDetails } from '../moviesObject';

@Injectable()
export class CharacterResolver implements Resolve<IStarWars> {
    StarDetail: IStarWars;
    arrayOfFilms = [];
    public movieObj: movieDetails;

    constructor(private starWarsService: StarWarsService,
                private router: Router,
                private http: HttpClient
              ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IStarWars> {

      let movies = this.starWarsService.get();
      this.starWarsService.changeStarWarsObj(this.StarDetail);
            if (movies) {

                          const urls = [];
                          for (let i = 0; i < movies.films.length; i++) {
                            urls.push(movies.films[i]);
                          }

                          this.arrayOfFilms = [];
                          Observable.of(...urls)
                            .mergeMap((url: string) => this.http.get(url))
                            .subscribe(
                              (result) => {
                                  if(result){
                                    this.movieObj = new movieDetails(result['title'], result['release_date']);
                                    this.arrayOfFilms.push(Object.assign({}, this.movieObj));
                                    movies.url = this.arrayOfFilms;
                                  }
                                },
                                 err => console.error('Observer got an error: ' + err) ,
                                 () => {
                                   this.starWarsService.changeStarWarsObj(movies);
                                 }
                          );

                          return Observable.of(movies);

            } else {
              console.log(`Actor was not found`);
              this.router.navigate(['/welcome']);
              return null;
            }

    }



}
