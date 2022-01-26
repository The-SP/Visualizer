function bubbleSortAnimation(array) {
  const n = array.length;
  let temp = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i-1; j++) {
      if (array[j] > array[j + 1]) {
        temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  return array;
}

export default bubbleSortAnimation;