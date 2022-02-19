export default function mergeSortAnimation(array) {
  const n = array.length;
  let results = []; // to store array at each iteration
  let rects = array.slice(); // create fresh copy

  function saveAnimation(index1, index2) {
    if (index1 >= n || index2 >= n) return;
    rects[index1] = { ...rects[index1], isSorting: true };
    rects[index2] = { ...rects[index2], isSorting: true };
    results.push(rects.slice()); // store animation
    rects[index1] = { ...rects[index1], isSorting: false };
    rects[index2] = { ...rects[index2], isSorting: false };
  }

  function merge(l, mid, r) {
    let i = l,
      k = l,
      j = mid + 1;
    let b = new Array(l + r + 1);
    while (i <= mid && j <= r) {
      saveAnimation(i, j);
      if (rects[i].height <= rects[j].height) {
        b[k] = { ...rects[i] };
        i++;
      } else {
        b[k] = { ...rects[j] };
        j++;
      }
      k++;
    }
    while (i <= mid) {
      saveAnimation(i, j);
      b[k] = { ...rects[i] };
      i++;
      k++;
    }
    while (j <= r) {
      saveAnimation(i, j);
      b[k] = { ...rects[j] };
      j++;
      k++;
    }
    for (let i = l; i <= r; i++) {
      rects[i] = { ...b[i], isSorted: true}; // since each partition is sorted make it green temporarily
      results.push(rects.slice());
    }

    // remove sorted partition bars green background
    for (let i=l; i<=r; i++) {
        rects[i] = { ...rects[i], isSorted: false};
    }
  }

  function mergeSortAlgo(l, r) {
    if (l < r) {
      let mid = Math.floor((l + r) / 2);
      mergeSortAlgo(l, mid);
      mergeSortAlgo(mid + 1, r);
      merge(l, mid, r);
    }
  }

  mergeSortAlgo(0, n - 1);
//   results.push(rects.slice()); // don't push final result (see Note: for more info)
  return results;
}

/* Note:
  In merge(), the i, j is filled with red color while storing to array b[]
  when b[] is copied back to rects[] each bar is made green (i.e to show that partition is sorted)
  later, the sorted partition's bars are reset to default color
  But, for last partition (i.e whole array) we need to preserve green color
  so, we don't push to result after changing its color to default so the last animation frame has all green bars
*/