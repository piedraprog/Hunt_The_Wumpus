export class Resources {
    
    images : any = {};
    musics : any = {};

    play(name : any , override = true) {

        // let sound = this.musics[name];

        // if (sound){
        //     if(override){
        //         sound.play();
        //     } else {
        //         if(!sound.playing()) {
        //             sound.play();
        //         }
        //     }
        // }
    }

    stop(name : string) {

        // let sound = this.musics[name];

        // if (sound && sound.playing()) {
        //     sound.stop();
        //     sound.unload();
        // }
    }

	loadMusic(name : string, file : any) {
 
        // console.log("Loading sound", file);

        // return new Promise((resolve, reject) => {

        //     let sound = new Howl({
        //         src: [file],
        //         html5: true,
        //         preload: true,
        //     });

        //     sound.once('load', function(){
        //         resolve([name, sound]);
        //     });
        // });
	}

    

    loadMusics() {

        // return new Promise((resolve, reject) => {

        //     const files = [
        //         this.loadMusic("move", 'audio/bump.wav'),
        //         this.loadMusic("game-over", 'audio/game-over.wav'),
        //         this.loadMusic("win", 'audio/win.wav'),
        //         this.loadMusic("gold", 'audio/coin.wav'),
        //         this.loadMusic("arrow", 'audio/arrow.wav'),
        //         this.loadMusic("error", 'audio/error.mp3'),
        //         this.loadMusic("theme", 'audio/background.mp3')
        //     ];

        //     Promise.all(files).then((result) => {
        //         resolve(["musics", Object.fromEntries(result)]);
        //     }).catch((error) => {
        //         reject(error);
        //     });
        // });
	}

    loadImage (name : string, url : string){

        return new Promise((resolve, reject) => {

            var image = new Image();

            image.onload = function() {
                resolve([name, image]);
            };

            image.src = url;
        });
	}

	loadImages(){

        const baseUrlPlayer : string = '../../../assets/player/';
        const baseUrlEnvironment : string = '../../../assets/game/';
        const baseUrlWumpus : string = '../../../assets/wumpus/';

        return new Promise((resolve, reject) => {

            const files = [
                this.loadImage('player_to_up', `${baseUrlPlayer}charlie/player_up.png`),
                this.loadImage('player_to_down', `${baseUrlPlayer}charlie/player_down.png`),
                this.loadImage('player_to_left', `${baseUrlPlayer}charlie/player_left.png`),
                this.loadImage('player_to_right', `${baseUrlPlayer}charlie/player_rigth.png`),
                this.loadImage('floor', `${baseUrlEnvironment}ground.png`),
                this.loadImage('fog', `${baseUrlEnvironment}fog.png`),
                this.loadImage('hole', `${baseUrlEnvironment}hole.png`),
                this.loadImage('arrow', `${baseUrlEnvironment}arrow_overlay.png`),
                this.loadImage('gold', `${baseUrlEnvironment}coin.png`),
                this.loadImage('wumpus', `${baseUrlWumpus}Wumpus.png`),
            ];

            Promise.all(files).then((result : any) => {
                resolve(["images", Object.fromEntries(result)]);
            }).catch((error) => {
                reject(error);
            });
        });
	}

    load() {

        // let that = this;

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