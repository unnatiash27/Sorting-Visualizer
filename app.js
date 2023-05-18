const size = document.getElementById("size");
const generateArrayForm = document.querySelector("#generateArrayForm");
let bars;

function generateArray(size) {
  const array = [];
  for (let i = 0; i < size; i++) {
    const value = Math.floor(Math.random() * 100) + 1;
    array.push(value);
  }
  return array;
}


function displayArray(array) {
  const container = document.getElementById("array-container");
  // clear previous graph
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.classList.add("array-bar");
    bar.style.height = `${array[i] * 5}px`; // Increase the height by multiplying with a factor (e.g., 5)
    bar.style.width = "10px"; // Increase the width to make the bars wider
    container.appendChild(bar);
  }
  bars = document.querySelectorAll(".array-bar");
}





async function bubbleSort() {
  let n=bars.length;
  for (let i=0; i<n; i++) {
    for(let j=0;j<n-i-1;j++){
      let bar1=bars[j];
      let bar2=bars[j+1];
      let height1=bar1.style.height;
      let height2=bar2.style.height;
      if(parseInt(height1)>parseInt(height2)){
        await swap(bar1,bar2);
        bars=document.querySelectorAll(".array-bar");
      }
    }
  }
  displayMessage("Bubble sort completed!");
}


function swap(bar1, bar2) {
  return new Promise((resolve) => {
    // Add a class to the bars being swapped
    bar1.classList.add("swapping");
    bar2.classList.add("swapping");

    let temp = bar1.style.height;
    bar1.style.height = bar2.style.height;
    bar2.style.height = temp;

    setTimeout(() => {
      // Remove the class after the animation is complete
      bar1.classList.remove("swapping");
      bar2.classList.remove("swapping");
      resolve();
    }, 50);
  });
}



 //merge sort
 async function merge(start, mid, end) {
  let i = start;
  let j = mid + 1;

  let tempArr = [];

  while (i <= mid && j <= end) {
    let height1 = bars[i].style.height;
    let height2 = bars[j].style.height;

    if (parseInt(height1) < parseInt(height2)) {
      tempArr.push(height1);
      i++;
    } else {
      tempArr.push(height2);
      j++;
    }
  }

  while (i <= mid) {
    tempArr.push(bars[i].style.height);
    i++;
  }

  while (j <= end) {
    tempArr.push(bars[j].style.height);
    j++;
  }

  for (let k = start; k <= end; k++) {
    bars[k].style.height = tempArr[k - start];

    // Apply a different CSS class to the bars being merged
    bars[k].classList.add("sorting");

    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  // Remove the CSS class after the merge is complete
  for (let k = start; k <= end; k++) {
    bars[k].classList.remove("sorting");
  }
}


async function mergeSort() {
  await mergeSort_recursive(0, bars.length - 1);
  displayMessage("Merge sort completed!");
}





async function mergeSort_recursive(start, end) {
  if (start >= end) {
    return;
  }
  
  let mid = Math.floor((start + end) / 2);
  
  await mergeSort_recursive(start, mid);
  await mergeSort_recursive(mid + 1, end);
  
  await merge(start, mid, end);
 
}



async function insertionSort() {
  for (let i = 1; i < bars.length; i++) {
    let current = parseInt(bars[i].style.height);
    let j = i - 1;
    while (j >= 0 && parseInt(bars[j].style.height) > current) {
      await swap(bars[j], bars[j + 1]);
      j--;
    }
    bars[j + 1].style.height = `${current}px`;
  }
  displayMessage("Insertion sort completed!");
}


async function selectionSort() {
  const n = bars.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < n; j++) {
      if (parseInt(bars[j].style.height) < parseInt(bars[minIndex].style.height)) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      await swap(bars[i], bars[minIndex]);
      bars = document.querySelectorAll(".array-bar");
    }
  }
  displayMessage("Selection sort completed!");
}


generateArrayForm.addEventListener("click", (event) => {
  event.preventDefault(); // prevent form submission
  const size = document.querySelector("#size").value;
  const array = generateArray(size);
  displayArray(array);
});


//quick sort
async function quickSort() {
  await performQuickSort(bars, 0, bars.length - 1);
  displayMessage("Quick sort completed!");
}

async function performQuickSort(arr, low, high) {
  if (low < high) {
    const pivotIndex = await partition(arr, low, high);
    await performQuickSort(arr, low, pivotIndex - 1);
    await performQuickSort(arr, pivotIndex + 1, high);
  }
}

async function partition(arr, low, high) {
  const pivot = parseInt(arr[high].style.height);
  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    if (parseInt(arr[j].style.height) < pivot) {
      i++;
      await swap(arr[i], arr[j]);
      bars = document.querySelectorAll(".array-bar");
    }
  }

  await swap(arr[i + 1], arr[high]);
  bars = document.querySelectorAll(".array-bar");
  return i + 1;

  
}





const bubbleSortBtn = document.querySelector("#bubbleSort");
bubbleSortBtn.addEventListener("click", bubbleSort);

const mergeSortBtn = document.querySelector("#mergeSort");
mergeSortBtn.addEventListener("click", mergeSort);

const insertionSortBtn = document.querySelector("#insertionSort");
insertionSortBtn.addEventListener("click", insertionSort);

const selectionSortBtn = document.querySelector("#selectionSort");
selectionSortBtn.addEventListener("click", selectionSort);

const quickSortBtn = document.querySelector("#quickSort");
quickSortBtn.addEventListener("click", quickSort);



function displayMessage(message) {
  alert(message);
} 