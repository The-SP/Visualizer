import { useEffect, useState } from "react/cjs/react.development";
import "./Sorting.css";
import bubbleSortAnimation from "../Algorithms/bubbleSort";
import { getRandomSize, testSortingAlgorithms } from "../helpers";

// constants
const NUMBER_OF_ARRAY_BARS = 50;
const ANIMATION_SPEED = 1;
const PRIMARY_COLOR = 'pink';
const SECONDARY_COLOR = 'red';

const Sorting = () => {
  const [array, setArray] = useState([]);

  function resetArray() {
    const arr = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      arr.push(getRandomSize(5, 500));
    }
    setArray(arr);
    console.log("arr from func and state", arr, array);
  }

  useEffect(resetArray, []);
  console.log("array from state", array);

  function bubbleSort() {
      // array.slice() returns new array
      // if we pass just array, it sorts existing array and returns it (i.e no copy is made)
      // React doesn't re-render becz the reference to array state doesn't change
      const sortedArray = bubbleSortAnimation(array.slice());
      setArray(sortedArray);
  }

  return (
    <>
      <div className="d-flex justify-content-between">
        <h1>Sorting Visualizer</h1>
        <button className="btn btn-success btn-sm" onClick={bubbleSort}>
          Bubble sort
        </button>
        <button className="btn btn-primary btn-sm" onClick={resetArray}>
          Generate random bars
        </button>
      </div>

      <div className="sorting">
        <div className="array-container">
          {array.map((value, index) => (
            <div
              className="array-bar"
              key={index}
              style={{ height: `${value}px` }}
            >
              {value}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sorting;