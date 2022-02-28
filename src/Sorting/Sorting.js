import { useEffect, useState } from "react";
import "./Sorting.css";
import { getRandomSize, toggleDisabled } from "../helpers";
import Bars from "./components/Bars";
import bubbleSortAnimation from "../Algorithms/bubbleSort";
import insertionSortAnimation from "../Algorithms/insertionSort";
import selectionSortAnimation from "../Algorithms/selectionSort";
import quickSortAnimation from "../Algorithms/quickSort";
import mergeSortAnimation from "../Algorithms/mergeSort";
import shellSortAnimation from "../Algorithms/shellSort";
import radixSortAnimation from "../Algorithms/radixSort";
import heapSortAnimation from "../Algorithms/heapSort";

const Sorting = () => {
  const [array, setArray] = useState([]);
  const [noOfBars, setNoOfBars] = useState(20); // 900 is limit otherwise nothing appears
  const [animation_speed, setAnimationSpeed] = useState(75);
  const [activeAlgorithm, setActiveAlgorithm] = useState(5);

  // Toggle theme
  const [theme, setTheme] = useState("light");
  function switchTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }

  const BACKGROUND_SHADES = [
    ["#ff99cc", "#ff88bb", "#ff77aa"], // light pink
    ["#fec8c1", "#feb2a8", "#fe9c8f"], // pastella
    ["#54b2a9", "#35a79c", "#009688"], // android lollipop
    ["#8dbdff", "#64a1f4", "#4a91f2"], // armor falls
    ["#660099", "#6600BB", "#6600DD"], // pinkish purple
    ["#006699", "#0066CC", "#0066FF"], // light blue
    ["#CC9900", "#CC9933", "#CC9966"], // orange, yellow
    ["#40E0D0", "#48D1CC", "#00CED1"], // cyan
  ];

  function resetArray() {
    const arr = [];
    const shades = getRandomSize(0, BACKGROUND_SHADES.length-1);
    for (let i = 0; i < noOfBars; i++) {
      arr.push({
        height: getRandomSize(5, 450),
        isSorted: false,
        isSorting: false,
        color: BACKGROUND_SHADES[shades][i%3],
      });
    }
    setArray(arr);
  }

  useEffect(resetArray, [noOfBars]);

  function handleAnimation(results) {
    toggleDisabled(true); // disable all btns and input fields while animation is running
    for (let i = 0; i < results.length; i++) {
      setTimeout(() => {
        setArray(results[i]);
      }, i * animation_speed);
    }
    // enable all btns and input fields after animation is over
    setTimeout(() => {toggleDisabled(false)}, results.length*animation_speed)
  }

  function handleVisualize() {
    let results;
    switch (
      +activeAlgorithm // activeAlgorithm is string so, use + to convert to int
    ) {
      case 1:
        results = bubbleSortAnimation(array);
        break;
      case 2:
        results = insertionSortAnimation(array);
        break;
      case 3:
        results = selectionSortAnimation(array);
        break;
      case 4:
        results = quickSortAnimation(array);
        break;
      case 5:
        results = mergeSortAnimation(array);
        break;
      case 6:
        results = radixSortAnimation(array);
        break;
      case 7:
        results = shellSortAnimation(array);
        break;
      case 8:
        results = heapSortAnimation(array);
        break;
      default:
        results = bubbleSortAnimation(array);
        console.log(activeAlgorithm, "default: bubble");
        break;
    }
    handleAnimation(results);
  }

  return (
    <div className="theme" data-theme={theme}>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Sorting Visualizer</span>
          {/* Toggle theme */}
          <span
            className="theme-icon text-warning h4 mb-0"
            onClick={switchTheme}
          >
            {theme === "light" ? (
              <i className="bi bi-moon-stars"></i>
            ) : (
              <i className="bi bi-brightness-high"></i>
            )}
          </span>
        </div>
      </nav>

      <div className="d-flex justify-content-around align-items-center input-bar">
        <button className="btn btn-primary toggle-disabled" onClick={resetArray}>
          Randomize
        </button>

        {/* Speed input */}
        <div className="form-control" style={{ maxWidth: 250 }}>
          <label htmlFor="customRange3" className="form-label">
            <span className="text-primary">Animation Delay(ms): </span>
            <span className="font-weight-bold text-success">
              {" "}
              {animation_speed}
            </span>
          </label>
          <div className="d-flex align-items-center text-primary font-weight-bold">
            <span>1</span>
            <input
              type="range"
              className="form-range mx-2 toggle-disabled"
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
            className="form-control toggle-disabled"
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
            className="form-select toggle-disabled"
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

        <button className="btn btn-success toggle-disabled" onClick={handleVisualize}>
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
