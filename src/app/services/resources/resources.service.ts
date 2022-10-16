import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

	constructor() { }

	images: any = {};

	sounds: any = {}

    baseUrlPlayer : string = '../../../assets/player/';
    baseUrlEnvironment : string = '../../../assets/game/';
    baseUrlWumpus : string = '../../../assets/wumpus/';

	loadImage(name: string, url : string) {
		return new Promise((resolve , reject) => {
			const image = new Image();

			image.onload = () => {
				resolve([name,image])
			}

			image.src = url
		})
	}

	loadImages() {
		return new Promise((resolve , reject) => {
			const files = [
                this.loadImage('player_to_up', `${this.baseUrlPlayer}charlie/player_up.png`),
                this.loadImage('player_to_down', `${this.baseUrlPlayer}charlie/player_down.png`),
                this.loadImage('player_to_left', `${this.baseUrlPlayer}charlie/player_left.png`),
                this.loadImage('player_to_right', `${this.baseUrlPlayer}charlie/player_rigth.png`),
                this.loadImage('floor', `${this.baseUrlEnvironment}ground.png`),
                this.loadImage('fog', `${this.baseUrlEnvironment}fog.png`),
                this.loadImage('hole', `${this.baseUrlEnvironment}hole.png`),
                this.loadImage('arrow', `${this.baseUrlEnvironment}arrow_overlay.png`),
                this.loadImage('gold', `${this.baseUrlEnvironment}coin.png`),
                this.loadImage('wumpus', `${this.baseUrlWumpus}Wumpus.png`),
            ];

            Promise.all(files).then((result : any) => {
				// let newresult = Object.fromEntries(result)
                resolve(["images", Object.fromEntries(result)]);
            }).catch((error) => {
                reject(error);
            });
		})
	}

	load() {
		return new Promise((resolve, reject) => {

            const files = [
                this.loadImages(),
                // this.loadMusics(),
            ];

            Promise.all(files).then((result : any) => {

                result = Object.fromEntries(result);
                this.images = result.images;
                // that.musics = result.musics;

                resolve(result);
            }).catch((error) => {
                reject(error);
            });
        });
	}

}
