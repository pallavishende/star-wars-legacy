import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { CharacterResolver } from './character-details/character-details.resolve';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: 'welcome', component: WelcomeComponent },
            { path: '', redirectTo: 'welcome', pathMatch: 'full' },
            {
              path: 'characterDetails',
              resolve: { StarDetail: CharacterResolver },
              component: CharacterDetailsComponent
            }
        ], { enableTracing: true })
    ],
    exports: [ RouterModule ],
    providers: [CharacterResolver]
})
export class AppRoutingModule { }
