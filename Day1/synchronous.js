/**
 * Using the File System module
 * This is a synchronous file read
 */
const fs = require('fs');
const data = fs.readFileSync('/file.md'); // blocks here until entire file is read
console.log(data);

// Here moreWork() will only run after console.log
// as `fs.readFileSync` blocking the execution of any additional JavaScript until the entire file is read.
moreWork();
