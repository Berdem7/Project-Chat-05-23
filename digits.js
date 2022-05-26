arr = [2, 3, 4, 5];

function lastDigit(arr) {
  let lastdigit = arr[0] % 10;

  for (let i = 0; i < arr.length - 1; i++) {
    const nth = arr[i + 1] % 4;
    const iseven = arr[i + 1] % 2;

    if (lastdigit == 0) {
      lastdigit = 0;
    } else if (lastdigit == 1) {
      lastdigit = 1;
    } else if (lastdigit == 5) {
      lastdigit = 5;
    } else if (lastdigit == 6) {
      lastdigit = 6;
    } else if (lastdigit == 4) {
      if (iseven == 0) {
        lastdigit = 6;
      } else {
        lastdigit = 4;
      }
    } else if (lastdigit == 9) {
      if (iseven == 0) {
        lastdigit = 1;
      } else {
        lastdigit = 9;
      }
    } else if (lastdigit == 2) {
      if (nth == 0) {
        lastdigit = 6;
      } else if (nth == 1) {
        lastdigit = 2;
      } else if (nth == 2) {
        lastdigit = 4;
      } else if (nth == 3) {
        lastdigit = 8;
      }
    } else if (lastdigit == 3) {
      if (nth == 0) {
        lastdigit = 1;
      } else if (nth == 1) {
        lastdigit = 3;
      } else if (nth == 2) {
        lastdigit = 9;
      } else if (nth == 3) {
        lastdigit = 7;
      }
    } else if (lastdigit == 7) {
      if (nth == 0) {
        lastdigit = 1;
      } else if (nth == 1) {
        lastdigit = 7;
      } else if (nth == 2) {
        lastdigit = 9;
      } else if (nth == 3) {
        lastdigit = 3;
      }
    } else if (lastdigit == 8) {
      if (nth == 0) {
        lastdigit = 6;
      } else if (nth == 1) {
        lastdigit = 8;
      } else if (nth == 2) {
        lastdigit = 4;
      } else if (nth == 3) {
        lastdigit = 2;
      }
    }
  }
  return lastdigit;
}

console.log(lastDigit([12, 2, 534, 67, 532]));
