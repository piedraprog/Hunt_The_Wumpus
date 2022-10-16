import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "../app-routing.module";
import { MeterialAngModule } from "../material-ang.module";
import { GameComponent } from "./game/game.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { RulesModalComponent } from "./rules-modal/rules-modal.component";



@NgModule({
    declarations:[
        RulesModalComponent,
        GameComponent,
        NavbarComponent,
    ],
    imports:[
        BrowserModule,
        AppRoutingModule,
        MeterialAngModule,
    ],
    exports:[
        RulesModalComponent,
        GameComponent,
        NavbarComponent
    ]
})

export class ComponentModule{}