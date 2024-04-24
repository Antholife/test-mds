import { describe, expect, it } from '@jest/globals';
import * as Sort from "../index";
import { faker } from "@faker-js/faker";
import { sort } from 'fast-sort';
import fs from 'fs';
import { readCSVFile, writeCSVFile } from "../index";

interface RandomIntegersArray {
    MAX?: boolean;
    MIN?: boolean;
}

function generateRandomIntegersArrayMock(empiricalArray?: RandomIntegersArray): number[] {
    const randomIntegersArray = [];
    if(empiricalArray?.MAX){
        randomIntegersArray.push(Number.MAX_SAFE_INTEGER);
    }
    if(empiricalArray?.MIN){
        randomIntegersArray.push(Number.MIN_SAFE_INTEGER);
    }
    for (let i = 0; i < faker.number.int(9999); i++) {
        const randomNumber = faker.number.int(9999);
        randomIntegersArray.push(randomNumber);
    }
    return randomIntegersArray;
}

function generateRandomIntegersCSVMock(): number[] {
    let csvContent = '';
    const dataToCSV = generateRandomIntegersArrayMock();
    dataToCSV.forEach((item: number) => {
        csvContent += ` ${item}`;
    });
    csvContent = csvContent.trim().replace(/\s/g, ',');
    if (!fs.existsSync("./tmp")) {
        fs.mkdirSync("./tmp");
    }
    fs.writeFileSync("./tmp/fakeCSV_generateForTests.csv", csvContent);
    return dataToCSV;
}

describe('SIMPLE SORTING TESTS', () => {
    const randomArray = generateRandomIntegersArrayMock();
    it('selection', () => {
        expect(Sort.selectionSort(randomArray)).toEqual(sort(randomArray).asc());
    });
    it('bubble', () => {
        expect(Sort.bubbleSort(randomArray)).toEqual(sort(randomArray).asc());
    });
    it('insertion', () => {
        expect(Sort.insertionSort(randomArray)).toEqual(sort(randomArray).asc());
    });
    it('quick', () => {
        expect(Sort.quickSort(randomArray)).toEqual(sort(randomArray).asc());
    });
    it('merge', () => {
        expect(Sort.mergeSort(randomArray)).toEqual(sort(randomArray).asc());
    });
});

describe('EMPIRICAL SORTING TESTS MAX', () => {
    const randomArray = generateRandomIntegersArrayMock({MAX: true});
    it('selection', () => {
        expect(Sort.selectionSort(randomArray)).toEqual(sort(randomArray).asc());
    });
    it('bubble', () => {
        expect(Sort.bubbleSort(randomArray)).toEqual(sort(randomArray).asc());
    });
    it('insertion', () => {
        expect(Sort.insertionSort(randomArray)).toEqual(sort(randomArray).asc());
    });
    it('quick', () => {
        expect(Sort.quickSort(randomArray)).toEqual(sort(randomArray).asc());
    });
    it('merge', () => {
        expect(Sort.mergeSort(randomArray)).toEqual(sort(randomArray).asc());
    });
});

describe('EMPIRICAL SORTING TESTS MIN', () => {
    const randomArray = generateRandomIntegersArrayMock({MIN: true});
    it('selection', () => {
        expect(Sort.selectionSort(randomArray)).toEqual(sort(randomArray).asc());
    });
    it('bubble', () => {
        expect(Sort.bubbleSort(randomArray)).toEqual(sort(randomArray).asc());
    });
    it('insertion', () => {
        expect(Sort.insertionSort(randomArray)).toEqual(sort(randomArray).asc());
    });
    it('quick', () => {
        expect(Sort.quickSort(randomArray)).toEqual(sort(randomArray).asc());
    });
    it('merge', () => {
        expect(Sort.mergeSort(randomArray)).toEqual(sort(randomArray).asc());
    });
});

describe('EMPIRICAL SORTING TESTS BOTH', () => {
    const randomArray = generateRandomIntegersArrayMock({MAX: true, MIN: true});
    it('selection', () => {
        expect(Sort.selectionSort(randomArray)).toEqual(sort(randomArray).asc());
    });
    it('bubble', () => {
        expect(Sort.bubbleSort(randomArray)).toEqual(sort(randomArray).asc());
    });
    it('insertion', () => {
        expect(Sort.insertionSort(randomArray)).toEqual(sort(randomArray).asc());
    });
    it('quick', () => {
        expect(Sort.quickSort(randomArray)).toEqual(sort(randomArray).asc());
    });
    it('merge', () => {
        expect(Sort.mergeSort(randomArray)).toEqual(sort(randomArray).asc());
    });
});

describe('CSV FILE TRIVIAL TESTS', () => {
    const dataInCSV = generateRandomIntegersCSVMock();
    it('read', () => {
        expect(readCSVFile("./tmp/fakeCSV_generateForTests.csv")).toEqual(dataInCSV);
        expect(Sort.selectionSort(readCSVFile("./tmp/fakeCSV_generateForTests.csv"))).toEqual(sort(dataInCSV).asc());
        expect(Sort.bubbleSort(readCSVFile("./tmp/fakeCSV_generateForTests.csv"))).toEqual(sort(dataInCSV).asc());
        expect(Sort.insertionSort(readCSVFile("./tmp/fakeCSV_generateForTests.csv"))).toEqual(sort(dataInCSV).asc());
        expect(Sort.quickSort(readCSVFile("./tmp/fakeCSV_generateForTests.csv"))).toEqual(sort(dataInCSV).asc());
        expect(Sort.mergeSort(readCSVFile("./tmp/fakeCSV_generateForTests.csv"))).toEqual(sort(dataInCSV).asc());
    });
    it('write', () => {
        const dataToCSV = generateRandomIntegersCSVMock();
        const dataInCSV = readCSVFile("./tmp/fakeCSV_generateForTests.csv");
        writeCSVFile(Sort.selectionSort(dataInCSV), "Selection");
        writeCSVFile(Sort.bubbleSort(dataInCSV), "Bubble");
        writeCSVFile(Sort.insertionSort(dataInCSV), "Insertion");
        writeCSVFile(Sort.quickSort(dataInCSV), "Quick");
        writeCSVFile(Sort.mergeSort(dataInCSV), "Merge");

        const selectionData = readCSVFile("./tmp/results/Selection.csv");
        const bubbleData = readCSVFile("./tmp/results/Bubble.csv");
        const insertionData = readCSVFile("./tmp/results/Insertion.csv");
        const quickData = readCSVFile("./tmp/results/Quick.csv");
        const mergeData = readCSVFile("./tmp/results/Merge.csv");

        expect(selectionData).toEqual(sort(dataToCSV).asc());
        expect(bubbleData).toEqual(sort(dataToCSV).asc());
        expect(insertionData).toEqual(sort(dataToCSV).asc());
        expect(quickData).toEqual(sort(dataToCSV).asc());
        expect(mergeData).toEqual(sort(dataToCSV).asc());
    });
});

describe('CSV FILE READ BAD STRING TESTS', () => {
    if (!fs.existsSync("./tmp")) {
        fs.mkdirSync("./tmp");
    }
    it('readString', () => {
        fs.writeFileSync(`./tmp/badString.csv`, "3,4,5,hello,6,7");
        expect(() => readCSVFile("./tmp/badString.csv")).toThrowError('hello is not a number');
    });
    it('readCaracters', () => {
        fs.writeFileSync(`./tmp/badString.csv`, "3,4,5,!,6,7");
        expect(() => readCSVFile("./tmp/badString.csv")).toThrowError('! is not a number');
    });
    it('readEmpty', () => {
        fs.writeFileSync(`./tmp/badString.csv`, "");
        expect(() => readCSVFile("./tmp/badString.csv")).toThrowError('File is empty');
    });
    it('readEmptyValue', () => {
        fs.writeFileSync(`./tmp/badString.csv`, "3,4,5,,6,7");
        expect(() => readCSVFile("./tmp/badString.csv")).toThrowError('Empty value in CSV');
    });
    it('readNewLine', () => {
        fs.writeFileSync(`./tmp/badString.csv`, "3,4,5,\n,6,7");
        expect(() => readCSVFile("./tmp/badString.csv")).toThrowError('Carriage return or new line in CSV');
    });
    it('readCarriageReturn', () => {
        fs.writeFileSync(`./tmp/badString.csv`, "3,4,5,\r,6,7");
        expect(() => readCSVFile("./tmp/badString.csv")).toThrowError('Carriage return or new line in CSV');
    });
});




