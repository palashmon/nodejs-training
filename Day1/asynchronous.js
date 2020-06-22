/**
 * Using the File System module
 * This is a asynchronous file read
 */
const fs = require('fs');
fs.readFile('/file.md', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// moreWork() will now run before console.log
// as `fs.readFile()` is non-blocking so JavaScript execution can continue
// and moreWork() will be called first.
moreWork();
