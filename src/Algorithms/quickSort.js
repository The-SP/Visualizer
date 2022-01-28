export default function quickSortAnimation(array) {
  const n = array.length;
  let results = []; // to store array at each iteration
  let rects = array.slice(); // create fresh copy

  function partition(rects, lb, ub) {
    let start = lb;
    let end = ub;
    const pivot = rects[lb].height;
    while (start < end) {
      while (rects[start].height <= pivot && start < ub) start++;
      while (rects[end].height > pivot && end > lb) end--;
      if (start < end) [rects[start], rects[end]] = [rects[end], rects[start]]; // SWAP
      results.push(rects.slice());  // store animation
    }
    [rects[lb], rects[end]] = [rects[end], rects[lb]]; // Swap pivot to its correct position
    return end;
  }

  function quickSortAlgo(rects, lb, ub) {
    if (lb < ub) {
      // partition index
      let pi = partition(rects, lb, ub);
      quickSortAlgo(rects, lb, pi - 1);
      quickSortAlgo(rects, pi + 1, ub);
    }
  }

  quickSortAlgo(rects, 0, n - 1);
  results.push(rects.slice()); // push final result
  return results;
}