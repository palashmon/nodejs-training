/**
 * @file    This is our very first nodejs application
 * @author  Palash Mondal
 */
console.log('Hello from Node.js');

/**
 * Takes 2 numbers and returns their sum.
 * @param   {number} x - the first number
 * @param   {number} y - the second number
 * @returns {number} the sum of x and y
 */
function add(x, y) {
  return x + y;
}

var sum = add(1, 2);
console.log('Sum: ', sum);
