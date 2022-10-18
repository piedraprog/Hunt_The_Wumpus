import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms'


interface DataGameOver {
	points: number,
	isAlive: boolean
}

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.scss']
})


export class GameoverComponent implements OnInit {


	constructor(
		public _dialog: MatDialogRef<GameoverComponent>,
    	@Inject(MAT_DIALOG_DATA) public data: DataGameOver,
	) { }

	ngOnInit(): void {
	}

	CloseModal(value: string) {
		if(value == "") value = "unknown"+this.data.points;
		this._dialog.close(value)
	}
}
