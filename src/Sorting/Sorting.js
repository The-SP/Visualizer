import { useEffect, useState } from "react/cjs/react.development";
import "./Sorting.css";
import bubbleSortAnimation from "../Algorithms/bubbleSort";
import { getRandomSize, testSortingAlgorithms } from "../helpers";
import Bars from "./components/Bars";
import insertionSortAnimation from "../Algorithms/insertionSort";

// constants
const NUMBER_OF_ARRAY_BARS = 50; // 450 is limit otherwise nothing appears
const ANIMATION_SPEED = 10;
const PRIMARY_COLOR = 'pink';
const SECONDARY_COLOR = 'red';

const Sorting = () => {
  const [array, setArray] = useState([]);

  function resetArray() {
    const arr = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      arr.push({
          height: getRandomSize(5, 500),
          isSorted: false,
          isSorting: false
      });
    }
    setArray(arr);
    // console.log("arr from func and state", arr, array);
  }

  useEffect(resetArray, []);
//   console.log("array from state", array);

  function bubbleSort() {
      // array.slice() returns new array
      // if we pass just array, it sorts existing array and returns it (i.e no copy is made)
      // React doesn't re-render becz the reference to array state doesn't change
    //   const sortedArray = bubbleSortAnimation(array.slice());
    //   setArray(sortedArray);
    const results = bubbleSortAnimation(array);
    handleAnimation(results);
  }

  function insertionSort() {
      const results = insertionSortAnimation(array);
      handleAnimation(results);
  }

  function handleAnimation(results) {
      for (let i=0; i<results.length; i++) {
          // check swapped or not then change array state
          setTimeout(() => {
              setArray(results[i]);
          }, i*ANIMATION_SPEED);
      }
  }

  return (
    <>
      <div className="d-flex justify-content-between">
        <h1>Sorting Visualizer</h1>
        <button className="btn btn-success btn-sm" onClick={insertionSort}>
          Insertion sort
        </button>
        <button className="btn btn-success btn-sm" onClick={bubbleSort}>
          Bubble sort
        </button>
        <button className="btn btn-primary btn-sm" onClick={resetArray}>
          Generate random bars
        </button>
      </div>

      <div className="sorting">
        <Bars array={array} />
      </div>
    </>
  );
};

export default Sorting;