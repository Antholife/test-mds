import * as fs from 'fs';

/**
 * Sorts an array of numbers using the bubble sort algorithm.
 * @param arr - The array of numbers to be sorted.
 * @returns The sorted array of numbers.
 */
export function bubbleSort(arr: number[]): number[] {
    const len = arr.length;
    let swapped: boolean;

    // Repeat the process until there are no more permutations
    do {
        swapped = false;

        // Iterate through the array and compare each pair of numbers
        for (let i = 0; i < len - 1; i++) {
            // If the current number is greater than the next one, swap them
            if (arr[i] > arr[i + 1]) {
                const temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }
    } while (swapped); // Continue as long as there was a permutation

    return arr;
}


// const arrayToSort0 = [5, 3, 8, 1, 2];
// console.log("Before bubble :", arrayToSort0);
// console.log("After bubble :", bubbleSort(arrayToSort0));


/**
 * Sorts an array of numbers using the merge sort algorithm.
 * @param arr - The array of numbers to be sorted.
 * @returns The sorted array of numbers.
 */
export function mergeSort(arr: number[]): number[] {
    // Base case: if the array has 1 or fewer elements, it's already sorted
    if (arr.length <= 1) {
        return arr;
    }

    /**
     * Merges two sorted arrays into a single sorted array.
     * @param left - The left sorted array.
     * @param right - The right sorted array.
     * @returns The merged sorted array.
     */
    function merge(left: number[], right: number[]): number[] {
        const result: number[] = [];
        let leftIndex = 0;
        let rightIndex = 0;

        // Compare elements from both arrays and merge them into the result array
        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }

        // Add remaining elements from the left and right arrays
        return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    }

    // Find the middle index of the array
    const middle = Math.floor(arr.length / 2);

    // Split the array into two halves
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    // Recursively merge and sort the two halves
    return merge(mergeSort(left), mergeSort(right));
}


// const arrayToSort1 = [5, 3, 8, 1, 2];
// console.log("\nBefore merge :", arrayToSort1);
// console.log("After merge :", mergeSort(arrayToSort1));

/**
 * Sorts an array of numbers using the quick sort algorithm.
 * @param arr - The array of numbers to be sorted.
 * @returns The sorted array of numbers.
 */
export function quickSort(arr: number[]): number[] {
    // Base case: if the array has 1 or fewer elements, it's already sorted
    if (arr.length <= 1) {
        return arr;
    }

    // Choose a pivot element (here, the first element of the array)
    const pivot = arr[0];
    const left: number[] = [];
    const right: number[] = [];

    // Partition the array into two sub-arrays: elements less than the pivot and elements greater than the pivot
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    // Recursively sort the sub-arrays and concatenate them with the pivot element
    return quickSort(left).concat(pivot, quickSort(right));
}


// const arrayToSort2 = [5, 3, 8, 1, 2];
// console.log("\nBefore quick :", arrayToSort2);
// console.log("After quick :", quickSort(arrayToSort2));

/**
 * Sorts an array of numbers using the selection sort algorithm.
 * @param arr - The array of numbers to be sorted.
 * @returns The sorted array of numbers.
 */
export function selectionSort(arr: number[]): number[] {
    const len = arr.length;

    // Iterate through the array to select the smallest element in each iteration
    for (let i = 0; i < len - 1; i++) {
        let minIndex = i;

        // Find the index of the smallest element in the unsorted part of the array
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        // Swap the smallest element with the current element, if necessary
        if (minIndex !== i) {
            const temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }

    return arr;
}


// const arrayToSort3 = [5, 3, 8, 1, 2];
// console.log("\nBefore selected :", arrayToSort3);
// console.log("After selected :", selectionSort(arrayToSort3));

/**
 * Sorts an array of numbers using the insertion sort algorithm.
 * @param arr - The array of numbers to be sorted.
 * @returns The sorted array of numbers.
 */
export function insertionSort(arr: number[]): number[] {
    const len = arr.length;

    // Iterate through the array starting from the second element
    for (let i = 1; i < len; i++) {
        const key = arr[i];
        let j = i - 1;

        // Move elements of arr[0..i-1], that are greater than key, to one position ahead of their current position
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }

        // Place the key at its correct position in the sorted array
        arr[j + 1] = key;
    }

    return arr;
}

// const arrayToSort4 = [5, 3, 8, 1, 2];
// console.log("\nBefore insertion :", arrayToSort4);
// console.log("After insertion :", insertionSort(arrayToSort4));


/**
 * Reads a CSV file containing numeric data and returns it as an array of numbers.
 * @param filePath - The path to the CSV file to read.
 * @returns An array of numbers extracted from the CSV file.
 * @throws Error if the file is empty, contains an empty value, contains a carriage return or new line, or contains a non-numeric value.
 */
export function readCSVFile(filePath: string): number[] {
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Throw an error if the file is empty
    if (!fileContent) {
        throw new Error('File is empty');
    }

    // Split the file content by commas to extract the numeric data
    const dataToNumeric = fileContent.split(',');

    const csvData: number[] = [];

    // Convert each item from string to number and add it to the csvData array
    dataToNumeric.forEach((item: string) => {
        // Throw an error if the item is an empty string
        if (item === '') {
            throw new Error('Empty value in CSV');
        }

        // Throw an error if the item is a carriage return or new line
        if (item === '\n' || item === '\r') {
            throw new Error('Carriage return or new line in CSV');
        }

        // Throw an error if the item is not a number
        if (isNaN(Number(item))) {
            throw new Error(`${item} is not a number`);
        }

        csvData.push(Number(item));
    });

    return csvData;
}


/**
 * Writes numeric data to a CSV file.
 * @param dataToCSV - The array of numbers to be written to the CSV file.
 * @param nameOfTest - The name of the test or dataset.
 * @throws Error if there is an issue creating the directory or writing to the file.
 */
export function writeCSVFile(dataToCSV: number[], nameOfTest: string): void {
    let csvContent = '';

    // Concatenate the numbers into a CSV-formatted string
    dataToCSV.forEach((item: number) => {
        csvContent += ` ${item}`;
    });

    // Trim leading and trailing spaces, and replace internal spaces with commas
    csvContent = csvContent.trim().replace(/\s/g, ',');

    // Create the directory if it doesn't exist
    if (!fs.existsSync("./tmp/results")) {
        fs.mkdirSync("./tmp/results", { recursive: true });
    }

    // Write the CSV content to a file
    fs.writeFileSync(`./tmp/results/${nameOfTest}.csv`, `${csvContent}`);
}
