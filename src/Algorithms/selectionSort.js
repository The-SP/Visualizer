function selectionSortAnimation(array) {
  const n = array.length;
  let results = []; // to store array at each iteration
  let rects = array.slice(); // create copy
  let max, i, j;

  function saveAnimation(index1, index2) {
    rects[index1] = { ...rects[index1], isSorting: true }; // change color
    rects[index2] = { ...rects[index2], isSorting: true };
    results.push(rects.slice()); // store animation
    rects[index1] = { ...rects[index1], isSorting: false }; // revert color to default
    rects[index2] = { ...rects[index2], isSorting: false };
  }

  for (i = n - 1; i > 0; i--) {
    max = 0;
    for (j = 1; j <= i; j++) {
      if (rects[j].height > rects[max].height) max = j;
      saveAnimation(max, j);
    }
    if (max !== i) {
      [rects[i], rects[max]] = [rects[max], rects[i]]; // swap
    }
    rects[i] = { ...rects[i], isSorted: true }; // i th bar is sorted after inner loop
  }
  rects[0] = { ...rects[0], isSorted: true };
  results.push(rects.slice()); // push final result
  return results;
}

export default selectionSortAnimation;

/*
  bars at index max and j are compared so set color red
  i th bar(last bar) is sorted after inner loop so set color green
*/