function selectionSortAnimation(array) {
    const n = array.length;
    let results = []; // to store array at each iteration
    let rects = array.slice(); // create copy
    let max, i, j;
    for (i = n-1; i>0; i--) {
      max = 0;
      for (j=1; j<=i; j++) {
          if (rects[j].height > rects[max].height)
            max = j;
          rects[max] = {...rects[max], isSorting: true};
          rects[j] = {...rects[j], isSorting: true} // change color to red
          results.push(rects.slice()) // push
          rects[j] = {...rects[j], isSorting: false} // revert color to pink
          rects[max] = {...rects[max], isSorting: false};
      }
      if (max != i) {
          [rects[i], rects[max]] = [rects[max], rects[i]];
      }
      rects[i] = {...rects[i], isSorted: true};
    }
    rects[0] = {...rects[0], isSorted: true};
    results.push(rects.slice()); // push final result
    return results;
}

export default selectionSortAnimation;