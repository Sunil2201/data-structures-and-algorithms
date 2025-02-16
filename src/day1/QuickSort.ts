function swap(arr: number[], index1: number, index2: number): number[] {
    const temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;

    return arr;
}

function getPartitionIndex(arr: number[], low: number, high: number): number {
    const pivot: number = arr[low];
    let i: number = low;
    let j: number = high;

    while (i < j) {
        while (arr[i] <= pivot && i <= high - 1) {
            i += 1;
        }

        while (arr[j] > pivot && j > low) {
            j -= 1;
        }

        if (i < j) swap(arr, i, j);
    }

    swap(arr, low, j);
    return j;
}

function qs(arr: number[], low: number, high: number): void {
    if (low >= high) {
        return;
    }

    const partitionIndex: number = getPartitionIndex(arr, low, high);
    qs(arr, low, partitionIndex - 1);
    qs(arr, partitionIndex + 1, high);
}

export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1);
}
