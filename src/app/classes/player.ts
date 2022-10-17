/**************************************************
** GAME PLAYER CLASS
**************************************************/

import { Keycode } from "@interfaces/keys";
import { Resources } from "@classes/resources" 

let FACING_TO_UP = 1,
FACING_TO_DOWN = 2,
FACING_TO_LEFT = 3,
FACING_TO_RIGHT = 4;

export class Player {
    
    arrow: number;
    direction: number;
    speed: any;
    y: number;
    x: number;
    env: any;
    score: number;
    resources: any;
    
    constructor(env : any, x : number, y : number) {
        this.x = x;
        this.y = y;

        this.env = env;
        this.speed = this.env.height;
        

        this.direction = FACING_TO_DOWN;
        this.score = 0;
        this.arrow = 10;

        // this.resources = new Resources();
    }
    

    markAsVisible(){
        this.env.visible[this.getPosI()][this.getPosJ()] = 1;
    }

    kill(keys : Keycode) {

        let deadWumpus = null;

        if (keys.Space) {
            if (this.arrow == 0) {
                return false;
			}
            
			this.arrow--;
            
            keys.Space= false;
            
            let pos = null;
            
            if(this.direction == FACING_TO_UP) pos = {i:this.getPosI(), j:this.getPosJ()-1};
            if(this.direction == FACING_TO_DOWN) pos = {i:this.getPosI(), j:this.getPosJ()+1};
            if(this.direction == FACING_TO_LEFT) pos = {i:this.getPosI()-1, j:this.getPosJ()};
            if(this.direction == FACING_TO_RIGHT) pos = {i:this.getPosI()+1, j:this.getPosJ()};

            if(pos) deadWumpus = this.env.get(this.env.wumpus, pos.i, pos.j);

        }

        return deadWumpus;
    };

    capture(keys : Keycode) {

       let capturedGold = null;

        if (keys.Enter) {

            keys.Enter = false;
            capturedGold = this.env.get(this.env.golds, this.getPosI(), this.getPosJ());
        }

        return capturedGold;
    };

    update (keys : Keycode, context: CanvasRenderingContext2D, images : any) {
		// Previous position
		var prevX = this.x,
			prevY = this.y;
            // Up key takes priority over down
        if (keys.ArrowUp) {
            if(this.direction == FACING_TO_UP && this.y > 0){
                this.y -= this.speed;
            }else{
                this.direction = FACING_TO_UP;
            }
		} else if (keys.ArrowDown) {
            if(this.direction == FACING_TO_DOWN && this.y + this.speed < this.env.column * this.env.height){
      		    this.y += this.speed;
            }else{
                this.direction = FACING_TO_DOWN;
            }
		} else if (keys.ArrowLeft) {
            if(this.direction == FACING_TO_LEFT && this.x > 0){
      		    this.x -= this.speed;
            }else{
                this.direction = FACING_TO_LEFT;
            }
		} else if (keys.ArrowRight) {
            if(this.direction == FACING_TO_RIGHT && this.x + this.speed < this.env.row * this.env.width){
                this.x += this.speed;
            }else{
                this.direction = FACING_TO_RIGHT;
            }
		}

        this.markAsVisible();

        keys.ArrowUp = keys.ArrowDown = keys.ArrowLeft = keys.ArrowRight = false;
        this.draw(context, images);
		return (prevX != this.x || prevY != this.y) ? true : false;
	};

    getPosI (){
		return Math.floor(this.x / this.env.width);
	};

	getPosJ (){
		return Math.floor(this.y / this.env.height);
	};

	draw (ctx : CanvasRenderingContext2D, images : any) {       
        this.env.draw(ctx, images)
        if(this.direction == FACING_TO_DOWN){
            ctx.drawImage(images.images['player_to_down'], this.x, this.y, this.env.width, this.env.height);
        }else if(this.direction == FACING_TO_UP){
            ctx.drawImage(images.images['player_to_up'], this.x, this.y, this.env.width, this.env.height);
        }else if(this.direction == FACING_TO_LEFT){
            ctx.drawImage(images.images['player_to_left'], this.x, this.y, this.env.width, this.env.height);
        }else if(this.direction == FACING_TO_RIGHT){
            ctx.drawImage(images.images['player_to_right'], this.x, this.y, this.env.width, this.env.height);
        }

        
	};
};
