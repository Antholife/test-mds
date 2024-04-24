import * as fs from 'fs';

export function bubbleSort(arr: number[]): number[] {
    const len = arr.length;
    let swapped: boolean;
    do {
        swapped = false;
        for (let i = 0; i < len - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                const temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
    return arr;
}

const arrayToSort0 = [5, 3, 8, 1, 2];

// console.log("Before bubble :", arrayToSort0);
// console.log("After bubble :", bubbleSort(arrayToSort0));


export function mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr;
    }

    function merge(left: number[], right: number[]): number[] {
        const result: number[] = [];
        let leftIndex = 0;
        let rightIndex = 0;

        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }
        return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
}

const arrayToSort1 = [5, 3, 8, 1, 2];

// console.log("\nBefore merge :", arrayToSort1);
// console.log("After merge :", mergeSort(arrayToSort1));

export function quickSort(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[0];
    const left: number[] = [];
    const right: number[] = [];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return quickSort(left).concat(pivot, quickSort(right));
}

const arrayToSort2 = [5, 3, 8, 1, 2];

// console.log("\nBefore quick :", arrayToSort2);
// console.log("After quick :", quickSort(arrayToSort2));

export function selectionSort(arr: number[]): number[] {
    const len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            const temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
    return arr;
}

const arrayToSort3 = [5, 3, 8, 1, 2];

// console.log("\nBefore selected :", arrayToSort3);
// console.log("After selected :", selectionSort(arrayToSort3));

export function insertionSort(arr: number[]): number[] {
    const len = arr.length;
    for (let i = 1; i < len; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}

const arrayToSort4 = [5, 3, 8, 1, 2];

// console.log("\nBefore insertion :", arrayToSort4);
// console.log("After insertion :", insertionSort(arrayToSort4));


export function readCSVFile(filePath: string): number[] {
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    if(!fileContent) {
        throw new Error('File is empty');
    }

    const dataToNumeric = fileContent.split(',');

    const csvData: number[] = [];

    dataToNumeric.forEach((item: string) => {
        if(item === '') {
            throw new Error('Empty value in CSV');
        }
        if(item === '\n' || item === '\r') {
            throw new Error("Carriage return or new line in CSV")
        }
        if (isNaN(Number(item))) {
            throw new Error(`${item} is not a number`);
        }
        csvData.push(Number(item));
    });

    return csvData;
}

export function writeCSVFile(dataToCSV: number[], nameOfTest: string): void {
    let csvContent = '';
    dataToCSV.forEach((item: number) => {
        csvContent += ` ${item}`;
    });
    csvContent = csvContent.trim().replace(/\s/g, ',');
    if (!fs.existsSync("./tmp/results")) {
        fs.mkdirSync("./tmp/results", { recursive: true });
    }
    fs.writeFileSync(`./tmp/results/${nameOfTest}.csv`, `${csvContent}`);
}
