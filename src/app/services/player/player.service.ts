import { Injectable } from '@angular/core';
import { GameComponent } from '@components/game/game.component';
import { Keycode } from '@interfaces/keys';
import { GameService } from '@services/game/game.service';
import { ResourcesService } from '@services/resources/resources.service';
import { StorageService } from '@services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

	speed : number;
	direction = "FACING_TO_DOWN";
    score = 0;
    arrow = 10;

	posX : number = 0;
	posY : number = 0;

	roomOnRow : number;
	roomSize : number;
	
	public keyCodes : Keycode = {
        ArrowUp : false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false,
        Space: false,
        Enter: false,   
    }

	constructor(
		private _GameService : GameService,
		private _ResourcesService : ResourcesService,
		private _StorageService: StorageService
	) { 	
		this.roomOnRow = parseInt(this._StorageService.getData("roomOnRow")!);
		this.roomSize = parseInt(this._StorageService.getData("roomSize")!);
		this.speed = this.roomSize; 
	}
	
	markAsVisible() {

		// console.log(this._GameService.visible[this.getPosHorizontal()][this.getPosVertical()] = 1)
		this._GameService.visible[this.getPosHorizontal()][this.getPosVertical()] = 1;
	}

    kill(keys : Keycode) {

        var deadWumpus = null;

        // if (keys.Space) {

		// 	if (this.arrow == 0) {
		// 		return false;
		// 	}

		// 	this.arrow--;

        //     keys.space= false;

        //     var pos = null;

        //     if(this.direction == FACING_TO_UP) pos = {i:this.getPosI(), j:this.getPosJ()-1};
        //     if(this.direction == FACING_TO_DOWN) pos = {i:this.getPosI(), j:this.getPosJ()+1};
        //     if(this.direction == FACING_TO_LEFT) pos = {i:this.getPosI()-1, j:this.getPosJ()};
        //     if(this.direction == FACING_TO_RIGHT) pos = {i:this.getPosI()+1, j:this.getPosJ()};

        //     deadWumpus = this.env.get(this.env.wumpus, pos.i, pos.j);

        //     if (deadWumpus) {
        //         resources.play("arrow");
        //     }else{
        //         resources.play("error");
        //     }
        // }

        return deadWumpus;
    };

    capture() {

        // var capturedGold = null;

        // if (keys.Enter) {

        //     keys.Enter = false;


        //     capturedGold = this.env.get(this.env.golds, this.getPosI(), this.getPosJ());
        // }

        // return capturedGold;
    };

    update(context : CanvasRenderingContext2D) {
		// Previous position
		let prevX = this.posX,
			prevY = this.posY;
			// Up key takes priority over down
		if (this.keyCodes.ArrowUp) {
			if(this.direction == "FACING_TO_UP" && this.posY > 0){
				this.posY -= this.speed;
				this.draw(context);
				// resources.play("move");
			}else{
				this.direction = "FACING_TO_UP";
				this.draw(context);
           	}
		} else if (this.keyCodes.ArrowDown) {
            if(this.direction == "FACING_TO_DOWN" && this.posY + this.speed < this.roomOnRow * this.roomSize){
      		    this.posY += this.speed;
				  this.draw(context);
                //   resources.play("move");
            }else{
                this.direction = "FACING_TO_DOWN";
				this.draw(context);
            }
		} else if (this.keyCodes.ArrowLeft) {
            if(this.direction == "FACING_TO_LEFT" && this.posX > 0){
      		    this.posX -= this.speed;
				  this.draw(context);
                //   resources.play("move");
            }else{
                this.direction = "FACING_TO_LEFT";
				this.draw(context);
            }
		} else if (this.keyCodes.ArrowRight) {
            if(this.direction == "FACING_TO_RIGHT" && this.posX + this.speed < this.roomOnRow * this.roomSize){
                this.posX += this.speed;
				this.draw(context);
                // resources.play("move");
            }else{
                this.direction = "FACING_TO_RIGHT";
				this.draw(context);
            }
		}
		
		
        this.markAsVisible();

        this.keyCodes.ArrowUp = this.keyCodes.ArrowDown = this.keyCodes.ArrowLeft = this.keyCodes.ArrowRight = false;

		return (prevX != this.posX || prevY != this.posY) ? true : false;
	};

    evaluate = function(){

    };

    getPosHorizontal(){
		return Math.floor(this.posX / this.roomSize);
	};

	getPosVertical() {
		return Math.floor(this.posY / this.roomSize);
	};

	draw(context : CanvasRenderingContext2D) {
        if(this.direction == "FACING_TO_DOWN"){

            context.drawImage(this._ResourcesService.images['player_to_down'], this.posX, this.posY, this.roomSize, this.roomSize);

        }else if(this.direction == "FACING_TO_UP"){

            context.drawImage(this._ResourcesService.images['player_to_up'], this.posX, this.posY, this.roomSize, this.roomSize);

        }else if(this.direction == "FACING_TO_LEFT"){

            context.drawImage(this._ResourcesService.images['player_to_left'], this.posX, this.posY, this.roomSize, this.roomSize);

        }else if(this.direction == "FACING_TO_RIGHT"){

            context.drawImage(this._ResourcesService.images['player_to_right'], this.posX, this.posY, this.roomSize, this.roomSize);

        }
	};
  



}
