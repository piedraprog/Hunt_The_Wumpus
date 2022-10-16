import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "../app-routing.module";
import { ComponentModule } from "@components/components.module";
import { MeterialAngModule } from "../material-ang.module";
import { HomepageComponent } from "./homepage/homepage.component";
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

@NgModule({
    declarations:[
        HomepageComponent,
        LeaderboardComponent
    ],
    imports:[
        BrowserModule,
        AppRoutingModule,
        MeterialAngModule,
        ComponentModule
    ],
    exports:[
        HomepageComponent,
        LeaderboardComponent
    ]
})

export class PagesModule{}