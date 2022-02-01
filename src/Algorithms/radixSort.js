function radixSortAnimation(array) {
  const n = array.length;
  let results = []; // to store array at each iteration
  let rects = array.slice(); // create copy

  function saveAnimation(index) {
    rects[index] = { ...rects[index], isSorting: true };
    results.push(rects.slice()); // store animation
    rects[index] = { ...rects[index], isSorting: false };
  }

  function getMax() {
    let max = rects[0].height;
    for (let i = 1; i < n; i++)
      if (rects[i].height > max) max = rects[i].height;
    return max;
  }

  function getNoOfDigits(max) {
      if (max === 0) return 1;
      return Math.floor(Math.log10(Math.abs(max))) + 1;
  }

  function countSort(pos) {
    let output = new Array(n);
    let i;
    let count = new Array(10).fill(0);

    // Store count of occurrences
    for (i = 0; i < n; i++) count[Math.floor(rects[i].height / pos) % 10]++;

    // Calculate comulative count
    for (i = 1; i < 10; i++) count[i] += count[i - 1];

    for (i = n - 1; i >= 0; i--) {
      output[--count[Math.floor(rects[i].height / pos) % 10]] = { ...rects[i] };
      saveAnimation(i);
    }

    // Copy output[] to rect[], so that rects[] now contains sorted numbers according to current digit
    for (i = 0; i < n; i++) {
        saveAnimation(i);
        rects[i] = { ...output[i] };
        if (pass === digits) { // final pass (i.e bars are sorted in this pass)
            rects[i] = { ...rects[i], isSorted: true };
            results.push(rects.slice());
        } else {
            saveAnimation(i); // if not final pass, just show isSorting animation
        }
    }
    pass++; // increment pass to track for final animation
    results.push(rects.slice()); // result after each pass
  }

  // Radix Sort
  const maxHeight = getMax();
  const digits = getNoOfDigits(maxHeight); // get no of pass for final sorted animation
  let pass = 1;
  for (let pos = 1; Math.floor(maxHeight / pos) > 0; pos *= 10) countSort(pos);
  results.push(rects.slice()); // push final result
  return results;
}

export default radixSortAnimation;

/*
  - when building output array each bar from right to left is made red (isSorting)
  - when output array is copied to actual array, each bar status is saved before and after assignment
  - for final pass (i.e when pass = no of digits in max), 
    - when output is copied, the bars are placed in sorted position so make them green
*/