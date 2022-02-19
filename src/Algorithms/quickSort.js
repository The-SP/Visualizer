export default function quickSortAnimation(array) {
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

  function partition(rects, lb, ub) {
    let start = lb;
    let end = ub;
    const pivot = rects[lb].height;
    while (start < end) {
      while (rects[start].height <= pivot && start < ub) {
        saveAnimation(start, end);
        start++;
      }
      while (rects[end].height > pivot && end > lb) {
        saveAnimation(start, end);
        end--;
      }
      if (start < end) [rects[start], rects[end]] = [rects[end], rects[start]]; // SWAP
      saveAnimation(start, end);
    }
    saveAnimation(lb, end);
    [rects[lb], rects[end]] = [rects[end], rects[lb]]; // Swap pivot to its correct position
    rects[end] = { ...rects[end], isSorted: true }; // pivot is sorted so change color to green
    results.push(rects.slice());
    return end;
  }

  function quickSortAlgo(rects, lb, ub) {
    if (lb < ub) {
      // partition index
      let pi = partition(rects, lb, ub);
      quickSortAlgo(rects, lb, pi - 1);
      quickSortAlgo(rects, pi + 1, ub);
    } else {
      // if the partition is complete this condition runs
      // make all bars of this partition isSorted: true to change color to green
      for (let i = ub; i <= lb && i<n; i++) {
        rects[i] = { ...rects[i], isSorted: true };
        results.push(rects.slice());
      }
    }
  }

  quickSortAlgo(rects, 0, n - 1);
  results.push(rects.slice()); // push final result
  return results;
}

/* Note:
  here we keep track of start and end index with red color
  when pivot is set to its correct position change its color to green
  when any partition is completely sorted change all its bar to green
*/