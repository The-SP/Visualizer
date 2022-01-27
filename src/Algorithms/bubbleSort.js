function bubbleSortAnimation(array) {
  const n = array.length;
  let results = []; // to store array at each iteration
  let rects = array.slice(); // create copy
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i-1; j++) {
      if (j > 0) rects[j-1] = {...rects[j-1], isSorting: false}
        // for bars being compared make isSorting: true
      rects[j] = {...rects[j], isSorting: true};
      rects[j+1] = {...rects[j+1], isSorting: true};
      if (rects[j].height > rects[j + 1].height) {
        [rects[j], rects[j+1]] = [rects[j+1], rects[j]] //swap
    }
    results.push(rects.slice());
    }
    rects[n-i-1] = {...rects[n-i-1], isSorted: true} // the last bar is sorted after inner loop
    rects[n-i-2] = {...rects[n-i-2], isSorting: false} // j-1=n-i-2 change it back to not sorting
  }
  results.push(rects.slice()); // push final result
//   console.log("result", results)
  return results;
}

export default bubbleSortAnimation;