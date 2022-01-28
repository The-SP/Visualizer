function bubbleSortAnimation(array) {
  const n = array.length;
  let results = []; // to store array at each iteration
  let rects = array.slice(); // create fresh copy
  for (let i = 0; i < n-1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // these are bars we are comparing, so change their color
      rects[j] = { ...rects[j], isSorting: true };
      rects[j + 1] = { ...rects[j + 1], isSorting: true };
      if (rects[j].height > rects[j + 1].height) {
        [rects[j], rects[j + 1]] = [rects[j + 1], rects[j]]; //SWAP
      }
      results.push(rects.slice());
      rects[j] = { ...rects[j], isSorting: false }; // after push, revert color back to default
    }
    rects[n - i - 1] = { ...rects[n - i - 1], isSorted: true }; // the last bar is sorted after inner loop
    rects[n - i - 2] = { ...rects[n - i - 2], isSorting: false }; // j-1=n-i-2 change it back to not sorting
  }
  rects[0] = { ...rects[0], isSorted: true};
  results.push(rects.slice()); // push final result
  return results;
}

export default bubbleSortAnimation;