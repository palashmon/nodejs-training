/**
 * @file    This module exports a simple callback function
 *          so that it can be re-used in multiple files inside this folder.
 * @author  Palash Mondal
 */

 /**
 * This callback is displayed as a global member.
 * @callback myCallback
 * @param {Error} err
 * @param {array} data
 */
const myCallback = (err, data) => {
  if (err) return console.error(`\nError: ${err.message}`); // Check for the error and throw if it exists.
  console.log(`\nData received: ${data}`); // Otherwise proceed as usual.
};

module.exports = { myCallback }
