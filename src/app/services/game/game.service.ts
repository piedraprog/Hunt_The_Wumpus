import { Injectable } from '@angular/core';
import { PlayerService } from '@services/player/player.service';
import { ResourcesService } from '@services/resources/resources.service';
import { StorageService } from '@services/storage/storage.service';
import { UtilsService } from '@services/utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

	holes : any = [];
	wumpus: any = [];
	golds: any = [];
	removeWalls: boolean = false;
    visible: any;
    roomOnRow: number;
    roomSize: number;


	constructor(
		private _Utils : UtilsService,
		private _ResourcesService: ResourcesService,
        private _StorageService: StorageService
	) { 
        this.roomOnRow = parseInt(this._StorageService.getData("roomOnRow")!);
		this.roomSize = parseInt(this._StorageService.getData("roomSize")!);
    }

    restart() {
        this.visible = this.getMatrix(this.roomOnRow, this.roomOnRow, 0);

        this.visible[0][0] = 1;
        this.visible[0][1] = 1;
        this.visible[1][0] = 1;

        this.golds = this._Utils.copy(this.golds);
		this.holes = this._Utils.copy(this.holes);
		this.wumpus = this._Utils.copy(this.wumpus);
    }

    getMatrix = function(maxI : number, maxJ : number, initialValue : number){

        var initialValue = initialValue || 0;

        var matrix = new Array(maxI);

        for (var i = 0; i < maxI; i++) {

            matrix[i] = new Array(maxJ);

            for(var j = 0; j < maxJ; j++){
                matrix[i][j] = initialValue;
            }
        }

        return matrix;
    };

	randomInitialization (roomsOnRow : number, roomSize : number) {
		const {wumpus, holes, golds} = this._Utils.getRandomLevel(roomsOnRow, roomSize)

		this.holes = holes;
		this.golds = golds;
		this.wumpus = wumpus;
	}

	drawEnvironment(context : CanvasRenderingContext2D, roomsOnRow : number, roomSize : number): void {

        const holes = this.holes;
		const golds = this.golds;
		const wumpus = this.wumpus;

        const breeze : string = "Breeze"
        const stench : string = "Stench"

        for(var i = 0; i < roomsOnRow; i++){
            for(var j = 0; j < roomsOnRow; j++){
                context.drawImage(this._ResourcesService.images['floor'], i * roomSize, j * roomSize, roomSize, roomSize);
            }
        }

        for (let i = 0; i < holes.length; i++) {

            const hole = holes[i];

            context.drawImage(this._ResourcesService.images['hole'], hole[0] * roomSize, hole[1] * roomSize, roomSize, roomSize);

            this.drawText(context, breeze, hole[0], hole[1] + 1, 3, roomSize);
            this.drawText(context, breeze, hole[0], hole[1] - 1, 3, roomSize);
            this.drawText(context, breeze, hole[0] + 1, hole[1], 3, roomSize);
            this.drawText(context, breeze, hole[0] - 1, hole[1], 3, roomSize);
        }

        for (let i = 0; i < wumpus.length; i++) {

            const wumpu = wumpus[i];

            context.drawImage(this._ResourcesService.images['wumpus'], wumpu[0] * roomSize, wumpu[1] * roomSize, roomSize, roomSize);

            this.drawText(context, stench, wumpu[0], wumpu[1]+1, 14, roomSize);
            this.drawText(context, stench, wumpu[0], wumpu[1]-1, 14, roomSize);
            this.drawText(context, stench, wumpu[0]+1, wumpu[1], 14, roomSize);
            this.drawText(context, stench, wumpu[0]-1, wumpu[1], 14, roomSize);
        }

        for (let i = 0; i < golds.length; i++) {

            const gold = golds[i];

            context.drawImage(this._ResourcesService.images['gold'], gold[0]* roomSize, gold[1]* roomSize, roomSize, roomSize);
        }

		// set the fog
        for(var i = 0; i < roomsOnRow; i++){
            for(var j = 0; j < roomsOnRow; j++){
                if(this.visible[i][j] == 0 && !this.removeWalls){
                    context.drawImage(this._ResourcesService.images['fog'], i * roomSize, j * roomSize, roomSize, roomSize);
                }
            }
        }

        // Draw horizontal lines
        for (let i = 1; i < roomsOnRow; i++) {
            this.drawLine(context, i * roomSize, 0, i * roomSize, roomsOnRow * roomSize);
        }
        // Draw vertical lines
        for (let j = 1; j < roomsOnRow; j++) {
            this.drawLine(context, 0, j * roomSize, roomsOnRow * roomSize, j * roomSize);
        }
        
    }

    drawText(context : CanvasRenderingContext2D, text : string, rows : number, column : number, offset : number, roomSize : number) {
        context.font="15px Roboto";
        context.fillStyle = 'white';
        context.textBaseline = "hanging";
        context.fillText(text, rows * roomSize + 2, column * roomSize + offset); 
    }

    drawLine(context : CanvasRenderingContext2D, x0 : number, y0 : number, x1 : number, y1 : number) {
    	context.strokeStyle = 'Black';
    	context.lineWidth = 1.0;
    	context.moveTo(x0 + 0.5, y0 + 0.5);
    	context.lineTo(x1 + 0.5, y1 + 0.5);
    	context.stroke();
    }

	

	removeGold() {

	}

	removeWumpus() {

	}


}

