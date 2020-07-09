/**
 * @param {number[]} args
 */
function sum(...args) {
  let sum = 0;
  for (let arg of args) {
    sum += arg;
  }
  console.log('sum: ', sum);
}
sum(10, 20, 30, 40);
