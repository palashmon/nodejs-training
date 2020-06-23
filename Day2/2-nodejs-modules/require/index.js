/**
 * @file    This is used to read a file from the filesystem
 *          using built-in Node.js core module `fs`
 *          Docs: https://nodejs.org/api/fs.html
 * @author  Palash Mondal
 */
const fs = require('fs');

/**
 * Asynchronously reads the entire contents of a file.
 */
fs.readFile('./agenda.txt', 'utf-8', (err, content) => {
  if(err) {
    console.log("Error occurred!!");
  } else {
    console.log("File Content \n", content);
  }
});
