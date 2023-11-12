let blocks = [];
let isStopSorting = false
let sortingArr = []
let markerObj = {
   low: null, 
   high: null
}

function createBlocks(array) {
   const container = document.getElementById('container');
   container.innerHTML = '';
   blocks = [];

   for (let i = 0; i < array.length; i++) {
      const value = array[i];
      const block = document.createElement('div');
      block.className = 'block';
      block.style.height = `${value * 20}px`;
      container.appendChild(block);
      blocks.push(block);
   }
}

const stopSortBtn = document.querySelector('#stopSort')
const startSortBtn = document.querySelector('#startSort')
const pauseResumeSortBtn = document.querySelector('#pauseResumeSort')

function startSorting() {
   sortingArr = []
   markerObj.low = null
   markerObj.high = null
   isStopSorting = false
   const arrayInput = document.getElementById('array');
   const algorithmSelect = document.getElementById('algorithm');
   const array = arrayInput.value.split(',').map(Number);
   const algorithm = algorithmSelect.value;

   createBlocks(array);

   if (algorithm === 'quickSort') {
     quickSort(0, array.length - 1);
   } else if (algorithm === 'bubbleSort') {
     bubbleSort();
   } else if (algorithm === 'selectionSort') {
     selectionSort();
   } else if (algorithm === 'insertionSort') {
     insertionSort();
   } else if (algorithm === 'heapSort') {
     heapSort();
   }
}


function stopSorting() {
   isStopSorting = true
   sortingArr = []
   markerObj.low = null
   markerObj.high = null
}

const playPauseSorting = () => {
   isStopSorting = isStopSorting ? false : true
   const algorithmSelect = document.getElementById('algorithm');
   const algorithm = algorithmSelect.value;

   if (algorithm === 'quickSort') {
     let lowMarker = markerObj.low ? markerObj.low : 0
     let highMarker = markerObj.high ? markerObj.high : array.length - 1
     quickSort(lowMarker, highMarker);
   } else if (algorithm === 'bubbleSort') {
     bubbleSort();
   } else if (algorithm === 'selectionSort') {
     selectionSort();
   } else if (algorithm === 'insertionSort') {
     insertionSort();
   } else if (algorithm === 'heapSort') {
     heapSort();
   }
}

stopSortBtn.addEventListener('click', () => {
   stopSorting()
})

startSortBtn.addEventListener('click', () => {
   startSorting()
})

pauseResumeSortBtn.addEventListener('click', () => {
   playPauseSorting()
   pauseResumeSortBtn.innerText = isStopSorting ? 'Продолжить' : 'Пауза'
})