function insertionSortAnimation(array) {
  const n = array.length;
  let results = []; // to store array at each iteration
  let rects = array.slice(); // create copy
  let key, j;
  for (let i = 1; i < n; i++) {
    key = { ...rects[i] };
    for (j = i - 1; j >= 0 && rects[j].height > key.height; j--) {
      rects[j + 1] = { ...rects[j] }; // SWAP
      results.push(rects.slice());
    }
    rects[j + 1] = { ...key};
  }
  results.push(rects.slice()); // push final result
  return results;
}

export default insertionSortAnimation;