export class ArrayUtils {

    static getIndexesFromSize(lines : number) {

        let array = [];

        for (let i = 0; i < lines; i++) {
            array.push(i);
        }
        return array;
    }
    
    static getIndexes(lines : number, columns : number) {
        
        let array = [];
        
        for (let i = 0; i < lines; i++) {
            for (let j = 0; j < columns; j++) {
                array.push([i, j]);
            }
        }
        
        return array;
    }

    static copy(array : any) {

        let copy = [];
        for (let i = 0; i < array.length; i++) {
            copy.push(array[i]);
        }

        return copy;
    }

    static equals(array1 : any, array2 : any) {

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

    static search(array : any, value : any){

        for (let i = 0; i < array.length; i++) {
            if (ArrayUtils.equals(array[i], value)) {
                return array[i];
            }
        }
    }

    static contains(array : any, value : any) {
        for (let i = 0; i < array.length; i++) {
            if (ArrayUtils.equals(array[i], value)) {
                
                return true;
            }
        }

        return false;
    }

    static removeByValue(array : any, value : any) {

        var index = array.indexOf(value);

        if (index > -1) {
            array.splice(index, 1);
        }
    }

    static removeByValues(array : any, values : any) {

        let filtered : any = [];
        array.forEach((result : any) => {
            if (!ArrayUtils.contains(values, result)) {
                filtered.push(result);
            }
        });

        return filtered;
    }
}