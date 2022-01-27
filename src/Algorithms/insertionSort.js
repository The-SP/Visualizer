function insertionSortAnimation(array) {
  const n = array.length;
  let results = []; // to store array at each iteration
  let rects = array.slice(); // create copy
  let key, j;
  for (let i = 1; i < n; i++) {
    key = { ...rects[i] };
    for (j = i - 1; j >= 0 && rects[j].height > key.height; j--) {
      rects[j] = {...rects[j], isSorting: true}; // this is being compared, so change its color
      rects[j + 1] = { ...rects[j], isSorting: false}; // SWAP
      results.push(rects.slice());
      rects[j] = {...rects[j], isSorting: false}; // finished comparing, revert color back to default
    }
    rects[j + 1] = { ...key};
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