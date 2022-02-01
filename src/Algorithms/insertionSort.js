function insertionSortAnimation(array) {
  const n = array.length;
  let results = []; // to store array at each iteration
  let rects = array.slice(); // create copy
  let key, j;

  function saveAnimation(index) {
    rects[index] = { ...rects[index], isSorting: true };
    results.push(rects.slice()); // store animation
    rects[index] = { ...rects[index], isSorting: false };
  }
  
  for (let i = 1; i < n; i++) {
    key = { ...rects[i] };
    for (j = i - 1; j >= 0 && rects[j].height > key.height; j--) {
      saveAnimation(j);
      rects[j + 1] = { ...rects[j]}; // SWAP
    }
    rects[j + 1] = { ...key, isSorted: true};
    results.push(rects.slice()); // key(original a[i]) is put into its correct positon of sorted array so show it as green once
    rects[j+1] = {...rects[j+1], isSorted: false};
  }
  // After sorting is complete
  // for all bars from index 0 to last, make color green one at a time to show sorted complete animation
  for (let i=0; i<n; i++) {
      rects[i] = {...rects[i], isSorted: true};
      results.push(rects.slice());
  }
  results.push(rects.slice()); // push final result
  return results;
}

export default insertionSortAnimation;