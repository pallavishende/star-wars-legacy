import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { WelcomeService } from './welcome.service';
import { TableData } from '../data/characters';
import { StarWarsService } from '../starWars.service';
import { IStarWars } from '../starWarsObject';
import { movieDetails } from '../moviesObject';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  tableData = TableData[0];
  characters = this.tableData.characters;
  character:IStarWars;
  errorMessage = '';
  pageTitle = 'Star Wars Characters';
  starwarobj = {
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

  constructor(
    private welcomeService: WelcomeService,
    private starWarsService: StarWarsService,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit() {

  }

  routeToDetails(name, url){
    this.starwarobj.name = name;
    this.starwarobj.urlDetails = url;
    this.getCharacters(url);
  }

  getCharacters(url){
    this.welcomeService.getCharacters(url).subscribe(character => {
          this.character = character;

          if(this.character){
            this.starwarobj.releaseDate = new Date(this.character.releaseDate);
            this.starwarobj.height = this.character.height;
            this.starwarobj.films = this.character.films;
            this.starwarobj.mass = this.character.mass;
            this.starwarobj.hair_color = this.character.hair_color;
            this.starwarobj.skin_color = this.character.skin_color;
            this.starwarobj.eye_color = this.character.eye_color;
            this.starwarobj.birth_year = this.character.birth_year;
            this.starwarobj.gender = this.character.gender;
            this.starwarobj.homeworld = this.character.homeworld;
            this.starwarobj.created = this.character.created;
            this.starwarobj.edited = this.character.edited;

            this.starWarsService.set(this.starwarobj);

            this.router.navigate(['./characterDetails']);
          }
        },
        (error) => {this.errorMessage = 'Failed to retrieve data'});
  }
}
