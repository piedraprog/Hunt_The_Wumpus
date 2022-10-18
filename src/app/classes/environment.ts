import { Resources } from '@classes/resources'
import { ArrayUtils } from '@classes/array-utils'
import { RandomUtils } from '@classes/randomUtils';

export class Environment {
    row: number;
    column: number;
    width: number;
    height: number
    removeWalls: boolean;
    visible: any;
    holes: any[];
    wumpus: any[];
    golds: any[];
    level: any = {};
    resources: Resources;


    constructor(row: number, column : number, width : number, height : number ) {
        this.row = row;
        this.column = column;
        this.width = width;
        this.height = height;
        this.removeWalls = false;
        this.visible = [];
        this.holes = [];
        this.wumpus = [];
        this.golds = [];
        this.level = {};

        // this.resources = new Resources();
        this.randomInitialization();
    }

    restart() {
        this.visible = this.getMatrix(this.row, this.column);

        this.visible[0][0] = 1;
        
        this.golds = ArrayUtils.copy(this.level.golds);
		this.holes = ArrayUtils.copy(this.level.holes);
		this.wumpus = ArrayUtils.copy(this.level.wumpus);
    }

    randomInitialization(){ 
        this.level = RandomUtils.getRandomLevel(this.row, this.column);
        this.restart();
    };

    getMatrix(maxI : number, maxJ : number) {

        var initialValue = 0;
        var matrix = new Array(maxI);
        for (var i = 0; i < maxI; i++) {
            matrix[i] = new Array(maxJ);
            for(var j = 0; j < maxJ; j++){
                matrix[i][j] = initialValue;
            }
        }

        return matrix;
    };

    removeWumpus(deadWumpus : any) {
        this.visible[deadWumpus[0]][deadWumpus[1]] = 1
        this.wumpus = ArrayUtils.removeByValues(this.wumpus, [deadWumpus]);
    };

    removeGold(gold : any){
        this.golds = ArrayUtils.removeByValues(this.golds, [gold]);
    };

    contains(array : any, row : number, column : number){
        return this.get(array, row, column) != false;
    }

    get(array : any[], row: number, column: number){
        return ArrayUtils.search(array, [row, column]);
    }

    hasAWumpus(player: any){
        
        for (let i = 0; i < this.wumpus.length; i++) {
            const wumpu = this.wumpus[i];
            if (wumpu[0] == player.getPosI() && wumpu[1] == player.getPosJ()) {
                return true;
            }
        }

        return false;
    };

    hasAHole(player: any){

        for (let i = 0; i < this.holes.length; i++) {
            const hole = this.holes[i];
            if (hole[0] == player.getPosI() && hole[1] == player.getPosJ()) {
                console.log("a")
                return true;
            }
        }

        return false;
    };

    draw(ctx : CanvasRenderingContext2D, images: any) {

        const breeze = "breeze";
        const stench = "stench";    
        const brightness = "brightness";

        for(var i = 0; i < this.row; i++){
            for(var j = 0; j < this.column; j++){
                ctx.drawImage(images.images['floor'], i* this.width, j * this.height, this.width , this.height);
            }
        }

        for (let i = 0; i < this.holes.length; i++) {

            const hole = this.holes[i];

            ctx.drawImage(images.images['hole'], hole[0]*this.width, hole[1]*this.height, this.width, this.height);

            this.drawText(ctx, breeze, hole[0], hole[1] + 1, 3);
            this.drawText(ctx, breeze, hole[0], hole[1] - 1, 3);
            this.drawText(ctx, breeze, hole[0] + 1, hole[1], 3);
            this.drawText(ctx, breeze, hole[0] - 1, hole[1], 3);
        }

        for (let i = 0; i < this.wumpus.length; i++) {

            const wumpu = this.wumpus[i];

            ctx.drawImage(images.images['wumpus'], wumpu[0]*this.width, wumpu[1]*this.height, this.width, this.height);

            this.drawText(ctx, stench, wumpu[0], wumpu[1]+1, 14);
            this.drawText(ctx, stench, wumpu[0], wumpu[1]-1, 14);
            this.drawText(ctx, stench, wumpu[0]+1, wumpu[1], 14);
            this.drawText(ctx, stench, wumpu[0]-1, wumpu[1], 14);
        }

        for (let i = 0; i < this.golds.length; i++) {

            const gold = this.golds[i];
            ctx.drawImage(images.images['gold'], gold[0]*this.width, gold[1]*this.height, this.width, this.height);
        }

        for(var i = 0; i < this.row; i++){
            for(var j = 0; j < this.column; j++){
                if(this.visible[i][j] == 0 && !this.removeWalls){
                    ctx.drawImage(images.images['fog'], i*this.width, j*this.height, this.width, this.height);
                }
            }
        }

        // Draw horizontal lines
        for (let i = 1; i < this.row; i++) {
            this.drawLine(ctx, i * this.width, 0, i * this.height, this.column * this.width);
        }
        // Draw vertical lines
        for (let j = 1; j < this.column; j++) {
            this.drawLine(ctx, 0, j * this.height, this.row * this.width, j * this.height);
        }
	};

    drawText(ctx : CanvasRenderingContext2D, text : string, row: number, column: number, offset: number){
        ctx.font="12px Verdana";
        ctx.fillStyle = 'black';
        ctx.textBaseline = "hanging";
        ctx.fillText(text, row * this.width + 2, column * this.height + offset);
    }

    drawLine(ctx : CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number){
    	ctx.strokeStyle = 'black';
    	ctx.lineWidth = 1.0;
        //ctx.translate(0.5, 0.5)
    	ctx.moveTo(x0+0.5, y0+0.5);
    	ctx.lineTo(x1+0.5, y1+0.5);
    	ctx.stroke();
    }

    

}
