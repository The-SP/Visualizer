import { useEffect, useState } from "react/cjs/react.development";
import "./Sorting.css";
import { getRandomSize, testSortingAlgorithms } from "../helpers";
import Bars from "./components/Bars";
import bubbleSortAnimation from "../Algorithms/bubbleSort";
import insertionSortAnimation from "../Algorithms/insertionSort";
import selectionSortAnimation from "../Algorithms/selectionSort";
import quickSortAnimation from "../Algorithms/quickSort";

const Sorting = () => {
  const [array, setArray] = useState([]);
  const [noOfBars, setNoOfBars] = useState(20); // 450 is limit otherwise nothing appears
  const [animation_speed, setAnimationSpeed] = useState(100);

  function resetArray() {
    const arr = [];
    for (let i = 0; i < noOfBars; i++) {
      arr.push({
        height: getRandomSize(5, 500),
        isSorted: false,
        isSorting: false,
      });
    }
    setArray(arr);
    // console.log("arr from func and state", arr, array);
  }

  useEffect(resetArray, [noOfBars]);
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

  function selectionSort() {
    const results = selectionSortAnimation(array);
    handleAnimation(results);
  }

  function quickSort() {
    const results = quickSortAnimation(array);
    handleAnimation(results);
  }

  function handleAnimation(results) {
    for (let i = 0; i < results.length; i++) {
      setTimeout(() => {
        setArray(results[i]);
      }, i * animation_speed);
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h2>Sorting Visualizer</h2>
        {/* Speed input */}
        <div className="form-control" style={{ maxWidth: 250 }}>
          <label htmlFor="customRange3" className="form-label">
            <span className="text-primary">Animation Speed(ms): </span>
            <span className="font-weight-bold text-success">
              {" "}
              {animation_speed}
            </span>
          </label>
          <div className="d-flex align-items-center text-primary font-weight-bold">
            <span>1</span>
            <input
              type="range"
              className="form-range mx-2"
              min="1"
              max="1000"
              step="1"
              id="customRange3"
              value={animation_speed}
              onChange={(e) => setAnimationSpeed(e.target.value)}
            />
            <span>1000</span>
          </div>
        </div>
        {/* End of speed input */}

        <div className="form-floating">
          <input
            type="number"
            step="5"
            className="form-control"
            id="floatingInput4"
            value={noOfBars}
            onChange={(e) => {setNoOfBars(e.target.value)}}
          />
          <label htmlFor="floatingInput4">No of Bars</label>
        </div>

        <button className="btn btn-success btn-sm" onClick={quickSort}>
          Quick sort
        </button>
        <button className="btn btn-success btn-sm" onClick={insertionSort}>
          Insertion sort
        </button>
        <button className="btn btn-success btn-sm" onClick={selectionSort}>
          Selection sort
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
