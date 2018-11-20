import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/mergeMap';

import { WelcomeService } from '../welcome/welcome.service';
import { StarWarsService } from '../starWars.service';
import { IStarWars } from '../starWarsObject';
import { movieDetails } from '../moviesObject';

@Injectable()
export class CharacterResolver implements Resolve<IStarWars> {
    StarDetail: IStarWars;
    arrayOfFilms = [];
    character: any;
    public movieObj: movieDetails;

    constructor(private starWarsService: StarWarsService,
                private welcomeService: WelcomeService,
                private router: Router,
                private http: HttpClient,
                private toastr: ToastrService
              ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IStarWars> {

      let movies = this.starWarsService.get();
      if(!movies){
        this.router.navigate(['/welcome']);
        return Observable.of(null);
      }

      this.starWarsService.changeStarWarsObj(this.StarDetail);

      return this.welcomeService.getCharacters(movies.urlDetails).map(movie => {
                if (movie) {
                  this.character = movie
                    if (this.character) {
                      console.log(`Actor was not found`);
                      const urls = [];
                      for (let i = 0; i < this.character.films.length; i++) {
                        urls.push(this.character.films[i]);
                      }

                      this.arrayOfFilms = [];

                      Observable.of(...urls)
                        .mergeMap((url: string) => this.http.get(url))
                        .subscribe(
                          (result) => {
                              if(result){
                                this.movieObj = new movieDetails(result['title'], result['release_date']);
                                this.arrayOfFilms.push(Object.assign({}, this.movieObj));
                              }
                            },
                             err => console.error('Observer got an error: ' + err) ,
                             () => {
                               movies.url = this.arrayOfFilms;
                               this.starWarsService.changeStarWarsObj(movies);
                             }
                      );
                      return Observable.of(movies);
                    }

                }
                console.log(`Product was not found`);
                this.router.navigate(['/welcome']);
                return Observable.of(null);
            })
            .catch(error => {
                console.log(`Retrieval error: ${error}`);
                this.toastr.error('No Movies Found');
                this.router.navigate(['/welcome']);
                return Observable.of(null);
            });
    }
}
