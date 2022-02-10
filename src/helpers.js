import bubbleSortAnimation from "./Algorithms/bubbleSort";

function getRandomSize(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function toggleDisabled(disabledValue) {
  let btnsAndInputs = document.querySelectorAll(".toggle-disabled");    // get all btns and input fields in input bar
  for (let i = 0; i < btnsAndInputs.length; i++)
    btnsAndInputs[i].disabled = disabledValue;
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++)
    if (arrayOne[i] !== arrayTwo[i]) return false;
  return true;
}

function testSortingAlgorithms() {
  for (let i = 0; i < 1000; i++) {
    const array = [];
    const length = getRandomSize(1, 1000);
    for (let j = 0; j < length; j++) {
      array.push(getRandomSize(-1000, 1000));
    }
    const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    const bubbleSortedArray = bubbleSortAnimation(array);
    console.log(arraysAreEqual(javaScriptSortedArray, bubbleSortedArray));
  }
}

export { getRandomSize, toggleDisabled, arraysAreEqual, testSortingAlgorithms };
