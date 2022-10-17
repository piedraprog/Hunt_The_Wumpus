import { Component, OnInit, ViewChild, AfterViewInit, HostListener, Input } from '@angular/core';
import { Keycode } from '@interfaces/keys';
import { StorageService } from '@services/storage/storage.service';
import { Player } from '@classes/player';
import { Resources } from '@classes/resources';
import { Environment } from '@classes/environment';


// interface result

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
    images : any;


    // objects 
    player : Player;
    env : any;
    resources : Resources;
    isAlive: boolean;

    keyCodes : Keycode = {
        ArrowUp : false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false,
        Space: false,
        Enter: false,   
    }


    constructor(
        private _StorageService: StorageService
    ) { }

    @HostListener('document:keydown', ['$event'])
    handleKeyPress(event: KeyboardEvent) {      
        const key = event.keyCode
        switch (key) {
            case 37: // Left
                this.keyCodes.ArrowLeft = true;
                this.Update();
				break;
                
			case 38: // Up
                this.keyCodes.ArrowUp = true;
                this.Update();
				break;
			case 39: // Right
                this.keyCodes.ArrowRight = true;
                this.Update();
				break;
			case 40: // Down
                this.keyCodes.ArrowDown = true;
                this.Update();
				break;
			case 32: // Space
                this.keyCodes.Space = true;
                this.Update();
				break;
			case 13: // enter
                this.keyCodes.Enter = true;
                this.Update();
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

        this.resources = new Resources;
        this.resources.load().then((result : any)=>{
            this.images = result;
            this.restart();
            this.resizeCanvas();

            this.Animate();
        })
    }


    restart() { 
        if (!this.env){
            this.env = new Environment(this.roomsOnRow, this.roomsOnRow, this.roomSize, this.roomSize); 
        }

        if(this.isFinished) {
            this.env = new Environment(this.roomsOnRow, this.roomsOnRow, this.roomSize, this.roomSize);
        } else {
            this.env.restart();
        }

        this.player = new Player(this.env, 0, 0);

        this.isAlive = true;
	    this.isFinished = false;

        this.Animate();
    }

    resizeCanvas() {

    }


    Animate() {
        this.Update();
	    this.draw();
    }

    draw() {
        this.context.clearRect(0,0, this.canvasSize, this.canvasSize)

        if (this.env) {
            this.env.draw(this.context, this.images);
        }
    
        if (this.player) {
            this.player.draw(this.context, this.images);
        }
    }

    Update() {
        if (this.player.update(this.keyCodes, this.context, this.images)) {
            this.player.score += 10;
        }
        
        let deadWumpus = this.player.kill(this.keyCodes);

        if (deadWumpus) {
            this.player.score += 1000;
            this.env.removeWumpus(deadWumpus);
            this.player.update(this.keyCodes, this.context, this.images)
        }
    
        let capturedGold = this.player.capture(this.keyCodes);
    
        if (capturedGold) {
    
            this.player.score += 1000;
    
            this.env.removeGold(capturedGold);
    
            // resources.play("gold");
    
            if (this.env.golds.length === 0 || this.env.wumpus === 0){
                this.isFinished = true;
            }
        }
    
        if(this.env.hasAHole(this.player) || this.env.hasAWumpus(this.player)){
            this.isAlive = false;
            this.isFinished = true;
            alert("morido")
            this.restart();
        }
    }

    
    GameOver() {

    }

    
}
