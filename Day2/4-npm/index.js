/**
 * @file    This module is used to show simple lodash module example
 * @author  Palash Mondal
 */
const _ = require("lodash");

/**
 * Check if the passed object is empty
 * @param {object} obj - This is the passed object
 */
let main = (obj) => {
  let isEmptyObj = _.isEmpty(obj)
  console.log(`Is object empty = ${isEmptyObj}`);
};

let obj =  {};
let obj1 = { firstName: 'Palash' };
main(obj);
main(obj1);
// Output =>
// Is object empty = true
// Is object empty = false
