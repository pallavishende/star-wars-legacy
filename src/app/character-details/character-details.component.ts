import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private starWarsService: StarWarsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    /*
      this.moviedata = this.route.snapshot.data['StarDetail'];
      console.log(this.moviedata);
      if(this.moviedata) {
        this.StarDetail = this.moviedata;
      }
      */

      this.starWarsService.currentMessage.subscribe(message => {
        if(message){
          this.StarDetail = message;
          this.loading = false;
          console.log(this.StarDetail);
        }

      });
  }

      /*
  ngOnInit() {

    this.starWarsService.currentMessage.subscribe(message => {
      if(message){
        this.StarDetail = message;
        console.log(this.StarDetail);
      }

    });

    //console.log(this.StarDetail);

  }
*/
}
