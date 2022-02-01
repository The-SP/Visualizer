import { useEffect, useState } from "react";
import "./Sorting.css";
import { getRandomSize } from "../helpers";
import Bars from "./components/Bars";
import bubbleSortAnimation from "../Algorithms/bubbleSort";
import insertionSortAnimation from "../Algorithms/insertionSort";
import selectionSortAnimation from "../Algorithms/selectionSort";
import quickSortAnimation from "../Algorithms/quickSort";
import mergeSortAnimation from "../Algorithms/mergeSort";
import shellSortAnimation from "../Algorithms/shellSort";
import radixSortAnimation from "../Algorithms/radixSort";

const Sorting = () => {
  const [array, setArray] = useState([]);
  const [noOfBars, setNoOfBars] = useState(20); // 450 is limit otherwise nothing appears
  const [animation_speed, setAnimationSpeed] = useState(15);
  const [activeAlgorithm, setActiveAlgorithm] = useState(6);

  // Toggle theme
  const [theme, setTheme] = useState("light");
  function switchTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }

  function resetArray() {
    const arr = [];
    for (let i = 0; i < noOfBars; i++) {
      arr.push({
        height: getRandomSize(5, 450),
        isSorted: false,
        isSorting: false,
      });
    }
    setArray(arr);
    // console.log("arr from func and state", arr, array);
  }

  useEffect(resetArray, [noOfBars]);
  //   console.log("array from state", array);

  function handleAnimation(results) {
    for (let i = 0; i < results.length; i++) {
      setTimeout(() => {
        setArray(results[i]);
      }, i * animation_speed);
    }
  }

  function handleVisualize() {
    let results;
    switch (
      +activeAlgorithm // activeAlgorithm is string so, use + to convert to int
    ) {
      case 1:
        results = bubbleSortAnimation(array);
        console.log(activeAlgorithm, "bubble");
        break;
      case 2:
        results = insertionSortAnimation(array);
        console.log(activeAlgorithm, "insertion");
        break;
      case 3:
        results = selectionSortAnimation(array);
        console.log(activeAlgorithm, "selection");
        break;
      case 4:
        results = quickSortAnimation(array);
        console.log(activeAlgorithm, "quick");
        break;
      case 5:
        results = mergeSortAnimation(array);
        console.log(activeAlgorithm, "merge");
        break;
      case 6:
        results = radixSortAnimation(array);
        console.log(activeAlgorithm, "radix");
        break;
      case 7:
        results = shellSortAnimation(array);
        console.log(activeAlgorithm, "shell");
        break;
      case 8:
        // results = heapSortAnimation(array);
        console.log(activeAlgorithm, "heap");
        break;
      default:
        results = bubbleSortAnimation(array);
        console.log(activeAlgorithm, "default: bubble");
        break;
    }
    if (activeAlgorithm < 8) handleAnimation(results); // 8th (heap sort) algorithm not implemented yet
  }

  return (
    <div class="theme" data-theme={theme}>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Sorting Visualizer</span>
          {/* Toggle theme */}
          <span className="theme-icon text-warning h4 mb-0" onClick={switchTheme}>
            {theme === "light" ? (
              <i className="bi bi-moon-stars"></i>
            ) : (
              <i className="bi bi-brightness-high"></i>
            )}
          </span>
        </div>
      </nav>

      <div className="d-flex justify-content-around align-items-center">
        <button className="btn btn-primary" onClick={resetArray}>
          Randomize
        </button>

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
            onChange={(e) => {
              setNoOfBars(e.target.value);
            }}
          />
          <label htmlFor="floatingInput4">No of Bars</label>
        </div>

        {/* Select Algorithm */}
        <div className="form-floating" style={{ minWidth: 250 }}>
          <select
            className="form-select"
            id="floatingSelect"
            aria-label="Floating label select example"
            value={activeAlgorithm}
            onChange={(e) => setActiveAlgorithm(e.target.value)}
          >
            <option value="1">Bubble Sort</option>
            <option value="2">Insertion Sort</option>
            <option value="3">Selection Sort</option>
            <option value="4">Quick Sort</option>
            <option value="5">Merge Sort</option>
            <option value="6">Radix Sort</option>
            <option value="7">Shell Sort</option>
            <option value="8">Heap Sort</option>
          </select>
          <label htmlFor="floatingSelect">Sorting Algorithm</label>
        </div>

        <button className="btn btn-success" onClick={handleVisualize}>
          Visualize
        </button>
      </div>

      <div className="sorting">
        <Bars array={array} />
      </div>
    </div>
  );
};

export default Sorting;
