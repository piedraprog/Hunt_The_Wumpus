import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

	titleNav : string = environment.pageTitle;
	langs : string[] = [];
	currentLang : string;


	constructor(
		private _translate : TranslateService,
	) { 
		this.langs = this._translate.getLangs();
	}

	ngOnInit(): void {
		this._translate.onLangChange.subscribe((result)=>{
			this.currentLang = result.lang == "es" ? result.lang + ' 🇪🇸' : result.lang + ' 🇺🇸';
		})
	}

	changeLenguage(lang : string) {
		this._translate.setDefaultLang(lang)
		this._translate.use(lang)
  	} 
}
