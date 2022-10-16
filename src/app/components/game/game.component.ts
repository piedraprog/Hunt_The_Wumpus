import { Component, OnInit, ViewChild, AfterViewInit, HostListener, Input } from '@angular/core';
import { GameService } from '@services/game/game.service';
import { Keycode } from '@interfaces/keys';
import { ResourcesService } from '@services/resources/resources.service';
import { UtilsService } from '@services/utils/utils.service';
import { PlayerService } from '@services/player/player.service';
import { StorageService } from '@services/storage/storage.service';



@Component({
  selector: 'app-game',
  template: `<canvas #gameCanvas style="border: solid black;"></canvas>`,
})

export class GameComponent implements OnInit , AfterViewInit {

    @Input() worldSize: number;

    @ViewChild('gameCanvas', { static: false }) gameCanvas: any;
        
    canvasSize: number = 750;
    roomsOnRow: number = 10;
    roomSize :number = this.canvasSize / this.roomsOnRow;
    worldAutoIncrement = false;
    context : CanvasRenderingContext2D;
    isFinished : boolean = false;
    isDead : boolean = false;



    constructor(
        private _GameService : GameService,
        private _ResourcesService : ResourcesService,
        private _PlayerService : PlayerService,
        private _StorageService: StorageService
    ) { }

    @HostListener('document:keydown', ['$event'])
    handleKeyPress(event: KeyboardEvent) {      

        const key = event.keyCode
        switch (key) {
            case 37: // Left
                this._PlayerService.keyCodes.ArrowLeft = true;
                this._PlayerService.update(this.context);
                // this._GameService.drawEnvironment(this.context, this.roomsOnRow, this.roomSize);

				break;
			case 38: // Up
                this._PlayerService.keyCodes.ArrowUp = true;
                this._PlayerService.update(this.context);
                // this._GameService.drawEnvironment(this.context, this.roomsOnRow, this.roomSize);
				break;
			case 39: // Right
                this._PlayerService.keyCodes.ArrowRight = true;
                this._PlayerService.update(this.context);
                // this._GameService.drawEnvironment(this.context, this.roomsOnRow, this.roomSize);
				break;
			case 40: // Down
                this._PlayerService.keyCodes.ArrowDown = true;
                this._PlayerService.update(this.context);
                // this._GameService.drawEnvironment(this.context, this.roomsOnRow, this.roomSize);
				break;
			case 32: // Space
                this._PlayerService.keyCodes.Space = true;
                // this._PlayerService.update(this.context);
				break;
			case 13: // enter
                this._PlayerService.keyCodes.Enter = true;
                // this._PlayerService.update(this.context);
				break;
        }
    }

    ngOnInit(): void {
        this._StorageService.saveData("roomSize",this.roomSize.toString());
        this._StorageService.saveData("roomOnRow",this.roomsOnRow.toString());
    }
    
    
    ngAfterViewInit(): void {
        this.Render()
    }

    
    private Render() : void {
        const canvas = this.gameCanvas.nativeElement;
        this.context = canvas.getContext('2d');

        canvas.width = this.canvasSize;
        canvas.height = this.canvasSize;
        this._ResourcesService.load().then(()=>{
            this.Restart();
            this.resizeCanvas();
            this.Animate();
        })
    }

    Animate() {
        this.Update();
        this._GameService.randomInitialization(this.roomsOnRow,this.roomSize)
	    this.draw();
    }

    draw() {

        this.context.clearRect(0,0, this.canvasSize, this.canvasSize)
        
        this._GameService.drawEnvironment(this.context, this.roomsOnRow, this.roomSize)
        this._PlayerService.draw(this.context);
    }

    Update() :void {
        if (this._PlayerService.update(this.context)) {
            this._PlayerService.score += 10;
        }
    
        // var deadWumpus = player.kill(keys);
    
        // if (deadWumpus) {
        //     player.score += 1000;
        //     env.removeWumpus(deadWumpus);
        // }
    
        // var capturedGold = player.capture(keys);
    
        // if (capturedGold) {
    
        //     player.score += 1000;
    
        //     env.removeGold(capturedGold);
    
        //     resources.play("gold");
    
        //     if (env.golds.length == 0){
        //         isFinished = true;
        //     }
        // }
    
        // if(env.hasAHole(player) || env.hasAWumpus(player)){
        //     isAlive = false;
        // }
    
        // $("#score").html(player.score);
        // $("#arrow").html(player.arrow);
        // $("#gold").html(env.golds.length);
    
        // if(!isAlive){
        //     displayGameOver();
        // }
    
        // if(isFinished){
        //     displayCongratulations();
        // }
    }
    
    Restart(): void {
        this._GameService.restart();
    }

    resizeCanvas() : void {

    }

    // isHole(player : any) {

    //     for (let i = 0; i < this.holes.length; i++) {

    //         const hole = this.holes[i];

    //         if (hole[0] == this._PlayerService.getPosHorizontal() && hole[1] == this._PlayerService.getPosVertical()) {
    //             return true;
    //         }
    //     }

    //     return false;
    // };

	// isWumpus(player : any){
	// 	for (let i = 0; i < this.wumpus.length; i++) {

    //         const wumpu = this.wumpus[i];

    //         if (wumpu[0] == this._PlayerService.getPosHorizontal() && wumpu[1] == this._PlayerService.getPosVertical()) {
    //             return true;
    //         }
    //     }

    //     return false;
	// }

}
