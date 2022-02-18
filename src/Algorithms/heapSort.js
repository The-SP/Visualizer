function heapSortAnimation(array) {
  const n = array.length;
  let results = []; // to store array at each iteration
  let rects = array.slice(); // create fresh copy

  function saveAnimation(index1, index2) {
    // check if the index are valid, if they are out of bounds then using them can increase size of array
    if (index1 >= n || index2 >= n) return;
    // Save animation
    rects[index1] = { ...rects[index1], isSorting: true };
    rects[index2] = { ...rects[index2], isSorting: true };
    results.push(rects.slice());
    rects[index1] = { ...rects[index1], isSorting: false };
    rects[index2] = { ...rects[index2], isSorting: false };
  }

  // To max heapify a subtree rooted with node i
  function heapify(n, i) {
    let largest = i; // initialize largest as root
    let l = 2 * i + 1; // left node
    let r = 2 * i + 2; // right node

    // If left child is larger than largest so far
    saveAnimation(l, largest);
    if (l < n && rects[l].height > rects[largest].height) largest = l;

    // If right child is larger than largest so far
    saveAnimation(r, largest);
    if (r < n && rects[r].height > rects[largest].height) largest = r;

    // If largest is not root
    if (largest !== i) {
      // swap
      saveAnimation(i, largest);
      [rects[i], rects[largest]] = [rects[largest], rects[i]];
      saveAnimation(i, largest);

      // Recursively heapify the affected sub-tree
      heapify(n, largest);
    }
  }

  // main heap sort function

  // Build heap (rearrange array)
  for (let i = Math.floor(n / 2 - 1); i >= 0; i--) heapify(n, i);

  // Extract an element one by one from heap
  for (let i = n - 1; i > 0; i--) {
    // Swap current root and end element
    saveAnimation(0, i);
    [rects[0], rects[i]] = [rects[i], rects[0]];
    rects[i] = { ...rects[i], isSorted: true };
    saveAnimation(0, i);

    // call max heapify on the reduced array
    heapify(i, 0);
  }
  rects[0] = { ...rects[0], isSorted: true };

  results.push(rects.slice());
  return results;
}

export default heapSortAnimation;
