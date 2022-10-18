import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "../app-routing.module";
import { MeterialAngModule } from "../material-ang.module";
import { GameComponent } from "./game/game.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { TranslateModule } from '@ngx-translate/core';
import { ControlsComponent } from './controls/controls.component';
import { GameoverComponent } from './gameover/gameover.component';


@NgModule({
    declarations:[
        GameComponent,
        NavbarComponent,
        ControlsComponent,
        GameoverComponent,
    ],
    imports:[
        BrowserModule,
        AppRoutingModule,
        MeterialAngModule,
        TranslateModule
    ],
    exports:[
        GameComponent,
        NavbarComponent
    ]
})

export class ComponentModule{}