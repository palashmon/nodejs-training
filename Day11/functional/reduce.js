/**
 * The reduce() method executes a reducer function (that you provide)
 * on each element of the array, resulting in single output value.
 */
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// output: 15

/**
 * Flattening an Array Using Reduce
 */
const numArray = [1, 2, [3, 10, [11, 12]], [1, 2, [3, 4]], 5, 6];

function flattenArray(data) {
  // our initial value this time is a blank array
  const initialValue = [];

  // call reduce on our data
  return data.reduce((total, value) => {
    // if the value is an array then recursively call reduce
    // if the value is not an array then just concat our value
    return total.concat(Array.isArray(value) ? flattenArray(value) : value);
  }, initialValue);
}

flattenArray(numArray);
// output: [1, 2, 3, 10, 11, 12, 1, 2, 3, 4, 5, 6]
