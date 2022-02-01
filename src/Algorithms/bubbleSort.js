function bubbleSortAnimation(array) {
  const n = array.length;
  let results = []; // to store array at each iteration
  let rects = array.slice(); // create fresh copy

  function saveAnimation(index1, index2) {
    rects[index1] = { ...rects[index1], isSorting: true };
    rects[index2] = { ...rects[index2], isSorting: true };
    results.push(rects.slice()); // store animation
    rects[index1] = { ...rects[index1], isSorting: false };
    rects[index2] = { ...rects[index2], isSorting: false };
  }

  for (let i = 0; i < n-1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // these are bars we are comparing, so change their color
      saveAnimation(j, j+1);
      if (rects[j].height > rects[j + 1].height) {
        [rects[j], rects[j + 1]] = [rects[j + 1], rects[j]]; //SWAP
        saveAnimation(j, j+1); // if swap save animation to show swapping
      }
    }
    rects[n - i - 1] = { ...rects[n - i - 1], isSorted: true }; // the last bar is sorted after inner loop
  }
  rects[0] = { ...rects[0], isSorted: true};
  results.push(rects.slice()); // push final result
  return results;
}

export default bubbleSortAnimation;