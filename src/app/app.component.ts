import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment  } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {



	constructor (
		private _title: Title,
		private _translate : TranslateService
	) {
		this._title.setTitle(environment.pageTitle);
		this._translate.setDefaultLang('es');
		this._translate.addLangs(['es','en'])
		this._translate.use('es')
	}

}
