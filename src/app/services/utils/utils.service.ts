import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

	shuffle(array : any) : void {

		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}

	/**
	 * @param {number} min
	 * @param {number} max
	 * @returns a random number between min (included) and max (excluded)
	 */
	getRandomInteger(min : number, max : number)  {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	getRandomIndex(array : any) {
		return this.getRandomInteger(0, array.length);
	}

	getRandomElement(array : any) {
		return array[this.getRandomIndex(array)];
	}

	getRandomElements(array : any, numberOfElements : number) {

		let indexes = this.getIndexesFromSize(array.length);

		this.shuffle(indexes);

		let selected = indexes.filter((e,i) => i < numberOfElements);

		return selected.map(el => array[el]);
	}

	getRandomLevel(lines : number, columns : number) {

		let positions = this.getIndexes(lines, columns);

		positions = this.removeByValues(positions, [[0, 0]]);
		positions = this.removeByValues(positions, [[0, 1]]);
		positions = this.removeByValues(positions, [[1, 0]]);
		positions = this.removeByValues(positions, [[1, 1]]);

		let holes = this.getRandomElements(positions, 10);
		positions = this.removeByValues(positions, holes);

		let wumpus = this.getRandomElements(positions, 8);
		positions = this.removeByValues(positions, wumpus);

		let golds = this.getRandomElements(positions, 8);
		positions = this.removeByValues(positions, golds);

		return { holes, wumpus, golds };
	}

	getIndexesFromSize(lines : number) {

        let array = [];

        for (let i = 0; i < lines; i++) {
            array.push(i);
        }

        return array;
    }

    getIndexes(lines : number, columns : number) {

        let array = [];

        for (let i = 0; i < lines; i++) {
            for (let j = 0; j < columns; j++) {
                array.push([i, j]);
            }
        }

        return array;
    }

    copy(array : any) {

        let copy = [];

        for (let i = 0; i < array.length; i++) {
            copy.push(array[i]);
        }

        return copy;
    }

    equals(array1 : any, array2: any) {

        if (array1.length !== array2.length) {
            return false;
        }

        for (let i = 0; i < array1.length; i++) {
            if (array1[i] != array2[i]) {
                return false;
            }
        }

        return true;
    }

    search(array : any, value : any){

        for (let i = 0; i < array.length; i++) {
            if (this.equals(array[i], value)) {
                return array[i];
            }
        }
    }

    contains(array : any, value : number) {

        for (let i = 0; i < array.length; i++) {
            if (this.equals(array[i], value)) {
                return true;
            }
        }

        return false;
    }

    removeByValue(array : any, value : number) {

        var index = array.indexOf(value);

        if (index > -1) {
            array.splice(index, 1);
        }
    }

    removeByValues(array : any, values : any) {

        let filtered : any = [];

        array.forEach( (el1 : any) => {
            if (!this.contains(values, el1)) {
                filtered.push(el1);
            }
        });

        return filtered;
    }
}
