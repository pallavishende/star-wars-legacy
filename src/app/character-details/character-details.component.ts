import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StarWarsService } from '../starWars.service';
import { IStarWars } from '../starWarsObject';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {

  StarDetail: IStarWars;
  moviedata: IStarWars;
  loading: boolean = true;
  constructor(private starWarsService: StarWarsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
      this.starWarsService.currentMessage.subscribe(message => {
        if(message){
          this.StarDetail = message;
          this.loading = false;
        }
      });
    }

    routeback(){
      this.router.navigate(['/welcome']);
    }
  }
