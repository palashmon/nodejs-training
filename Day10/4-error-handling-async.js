const { prom1 } = require('./promises/promises');

// Using a IIFE here
(async function () {
  try {
    let result = await prom1();
    console.log('\nResult of prom1: ', result);

    // This line throws an error
    // we need to catch it and handle the error gracefully
    const data = JSON.parse('{a:}');
    console.log(data);
  } catch (err) {
    console.log('\nError handled:\n  --', err.message);
  }
})();
