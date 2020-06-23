/**
 * @file    Here we simply consume the local `circle.js` module using `require`
 *          This module is used to show success callback.
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
    console.log('fetchData data finished!!');
    console.timeEnd();

    const response = [1,2,3]
    callback(null, [1,2,3]);
  }, 2000)
};

// Finally call the function and pass the reference of myCallback function
fetchData(myCallback)

// Output =>
// fetchData data started...
// fetchData data finished!!
// default: 2004.823ms

// Data received: 1,2,3
