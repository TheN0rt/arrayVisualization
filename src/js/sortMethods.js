function swapBlocks(i, j) {
   const temp = blocks[i].style.height;
   blocks[i].style.height = blocks[j].style.height;
   blocks[j].style.height = temp;
   sortingArr = [...blocks]
}

async function quickSort(low, high) {
   markerObj.low = low
   markerObj.high = high
   if (low < high) {
     const pivotIndex = await partition(low, high);
     await Promise.all([
       quickSort(low, pivotIndex - 1),
       quickSort(pivotIndex + 1, high)
     ]);
   }
}

async function partition(low, high) {
   const pivot = parseInt(blocks[high].style.height);
   let i = low - 1;

   for (let j = low; j < high; j++) {
     if(isStopSorting){
       return
     }
     blocks[j].style.backgroundColor = 'red';
     await new Promise(resolve => setTimeout(resolve, 1000));

     const value = parseInt(blocks[j].style.height);
     if (value < pivot) {
       i++;
       swapBlocks(i, j);
     }

     blocks[j].style.backgroundColor = 'lightblue';
   }

   swapBlocks(i + 1, high);

   return i + 1;
}

async function selectionSort() {
   
   const n = sortingArr.length > 0 ? sortingArr.length : blocks.length;
   for (let i = 0; i < n - 1; i++) {
     if(isStopSorting){
       return
     }
     let minIndex = i;
     blocks[minIndex].style.backgroundColor = 'red';
     await new Promise(resolve => setTimeout(resolve, 1000));

     for (let j = i + 1; j < n; j++) {
       blocks[j].style.backgroundColor = 'red';
       await new Promise(resolve => setTimeout(resolve, 1000));

       const value1 = parseInt(blocks[j].style.height);
       const minValue = parseInt(blocks[minIndex].style.height);
       if (value1 < minValue) {
         blocks[minIndex].style.backgroundColor = 'lightblue';
         minIndex = j;
         blocks[minIndex].style.backgroundColor = 'red';
       } else {
         blocks[j].style.backgroundColor = 'lightblue';
       }
     }

     swapBlocks(i, minIndex);
     blocks[i].style.backgroundColor = 'lightblue';
   }
}

async function bubbleSort() {
   
   const n = sortingArr.length > 0 ? sortingArr.length : blocks.length;
   for (let i = 0; i < n - 1; i++) {
     if(isStopSorting){
       return
     }
     for (let j = 0; j < n - i - 1; j++) {
       blocks[j].style.backgroundColor = 'red';
       await new Promise(resolve => setTimeout(resolve, 1000));

       const value1 = parseInt(blocks[j].style.height);
       const value2 = parseInt(blocks[j + 1].style.height);
       if (value1 > value2) {
         swapBlocks(j, j + 1);
       }

       blocks[j].style.backgroundColor = 'lightblue';
     }
   }
}

async function insertionSort() {
   
   const n = sortingArr.length > 0 ? sortingArr.length : blocks.length;
   for (let i = 1; i < n; i++) {
     if(isStopSorting){
       return
     }
     let j = i;
     blocks[j].style.backgroundColor = 'red';
     await new Promise(resolve => setTimeout(resolve, 1000));

     const value = parseInt(blocks[j].style.height);
     while (j > 0 && parseInt(blocks[j - 1].style.height) > value) {
       blocks[j].style.height = blocks[j - 1].style.height;
       blocks[j].style.backgroundColor = 'lightblue';
       j--;
       blocks[j].style.backgroundColor = 'red';
       await new Promise(resolve => setTimeout(resolve, 1000));
     }
     blocks[j].style.height = `${value}px`;
     blocks[j].style.backgroundColor = 'lightblue';
   }
}

async function heapify(n, i) {
   let largest = i;
   let left = 2 * i + 1;
   let right = 2 * i + 2;

   if (left < n && parseInt(blocks[left].style.height) > parseInt(blocks[largest].style.height)) {
     largest = left;
   }

   if (right < n && parseInt(blocks[right].style.height) > parseInt(blocks[largest].style.height)) {
     largest = right;
   }

   if (largest !== i) {
     blocks[i].style.backgroundColor = 'red';
     blocks[largest].style.backgroundColor = 'red';
     await new Promise(resolve => setTimeout(resolve, 1000));

     let temp = blocks[i].style.height;
     blocks[i].style.height = blocks[largest].style.height;
     blocks[largest].style.height = temp;

     blocks[i].style.backgroundColor = 'lightblue';
     blocks[largest].style.backgroundColor = 'lightblue';

     await heapify(n, largest);
   }
}

async function heapSort() {
   
   const n = sortingArr.length > 0 ? sortingArr.length : blocks.length;
   
   for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
     if(isStopSorting){
       return
     }
     await heapify(n, i);
   }

   for (let i = n - 1; i > 0; i--) {
     if(isStopSorting){
       return
     }
     blocks[0].style.backgroundColor = 'red';
     blocks[i].style.backgroundColor = 'red';
     await new Promise(resolve => setTimeout(resolve, 1000));

     let temp = blocks[0].style.height;
     blocks[0].style.height = blocks[i].style.height;
     blocks[i].style.height = temp;

     blocks[0].style.backgroundColor = 'lightblue';
     blocks[i].style.backgroundColor = 'lightblue';

     await heapify(i, 0);
   }
}