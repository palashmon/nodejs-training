/**
 * @file    Here we simply consume the local `circle.js` module using `require`
 *          This module is used to show error callback.
 * @author  Palash Mondal
 */
const { myCallback } = require('./my-callback');

/**
 * We are assuming in this function a heavy operation happens
 * like fetching a data from database, and once it is completed
 * we simply return the callback with response data as 2nd param
 * @param   {myCallback} callback - The callback that handles the response.
 */
const fetchData = (callback) => {

  // Starts the timer
  console.log('\nfetchData data started...');
  console.time();

  // setTimeout is used here to simulate a fake database call
  // So, here response will return after 2 secs
  setTimeout(() =>{

    // Ends the timer and print the time taken by the piece of code
    console.timeEnd();

    var myError = new Error('fetchData failed!!');
    callback(myError, []);
  }, 2000)
};

// Finally call the function and pass the reference of myCallback function
fetchData(myCallback)

// Output =>
// fetchData data started...
// default: 2002.423ms

// Error: fetchData failed!!
