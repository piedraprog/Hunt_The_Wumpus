import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ControlsComponent } from '@components/controls/controls.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {

    worldSize: number;
    settingsIsVisible: boolean = false;
    homePageIsVisible: boolean = true;
    gameVisible: boolean = false;

    constructor(
        public _dialog : MatDialog
    ) { }

    ngOnInit(): void {
    }

    openSettings() {
        this.settingsIsVisible = true;
        this.homePageIsVisible = false;
    }

    openHome() {
        this.homePageIsVisible = true;
        this.settingsIsVisible = false;
    }

    openControls() {
        const controlModal = this._dialog.open(ControlsComponent)
    }

    play() {
        this.homePageIsVisible = false;
        this.settingsIsVisible = false;
        this.gameVisible = true;
    }

    
}
