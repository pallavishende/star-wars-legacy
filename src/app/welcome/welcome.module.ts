import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { WelcomeService } from './welcome.service';
import { StarWarsService } from '../starWars.service';

@NgModule({
    imports: [
      CommonModule
    ],
    declarations: [
        WelcomeComponent
    ],
    exports : [
      CommonModule
    ],
    providers: [
        WelcomeService,
        StarWarsService
    ]
})
export class WelcomeModule { }
