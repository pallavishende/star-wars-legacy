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
  character: IStarWars;
  errorMessage = '';
  pageTitle = 'Star Wars Characters';
  starwarobj = {
    name: '',
    urlDetails: '',
    releaseDate: new Date,
    films: [],
    url: ''
  };

  constructor(
    private welcomeService: WelcomeService,
    private starWarsService: StarWarsService,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit() {

  }

  routeToDetails(name, url) {
    this.starwarobj.name = name;
    this.starwarobj.urlDetails = url;
    this.starWarsService.set(this.starwarobj);
    this.router.navigate(['./characterDetails']);
  }

}
