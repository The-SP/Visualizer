function shellSortAnimation(array) {
  const n = array.length;
  let results = []; // to store array at each iteration
  let rects = array.slice(); // create copy
  let i, j, gap, temp;
  for (gap = Math.floor(n / 2); gap >= 1; gap=Math.floor(gap/2)) {
    for (i = gap; i < n; i++) {
      temp = { ...rects[i] };
      for (j = i; j >= gap && rects[j - gap].height > temp.height; j -= gap) {
        rects[j-gap] = {...rects[j-gap], isSorting: true};
        results.push(rects.slice());
        rects[j-gap] = {...rects[j-gap], isSorting: false};
        rects[j] = { ...rects[j - gap] }; // shift gap-sorted element
      }
      rects[j] = { ...temp, isSorted: true };
      results.push(rects.slice()); // temp(original a[i]) is put into its correct positon of gap-sorted array so show it as green once
      rects[j] = {...rects[j], isSorted: false};
    }
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

export default shellSortAnimation;