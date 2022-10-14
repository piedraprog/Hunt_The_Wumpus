import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment  } from 'src/environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor (private _title: Title) {
    this._title.setTitle(environment.pageTitle)
  }

}
