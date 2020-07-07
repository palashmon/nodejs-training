/**
 * The filter() method creates a new array with all elements
 * that pass the test implemented by the provided function.
 */

const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter((word) => word.length > 6);

console.log(result);
// output: Array ["exuberant", "destruction", "present"]

/**
 * Filtering out all small values
 * The following example uses filter() to create a filtered array that
 * has all elements with values less than 10 removed.
 */
function isBigEnough(value) {
  return value >= 10;
}

let filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
// output: [12, 130, 44]

/**
 * Find all prime numbers in an array
 */
const array = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

function isPrime(num) {
  for (let i = 2; num > i; i++) {
    if (num % i == 0) {
      return false;
    }
  }
  return num > 1;
}

console.log(array.filter(isPrime)); // [2, 3, 5, 7, 11, 13]
