const { prom1 } = require('./promises/promises');
const makeRequest = () => {
  try {
    prom1()
      .then((result) => {
        // this parse may fail
        const data = JSON.parse('{ a: }');
        console.log(data);
      })
      // uncomment this block to handle asynchronous errors
      .catch((err) => {
        console.log('Error handled:\n  --', err.message);
      });
  } catch (err) {
    console.log(err);
  }
};

makeRequest();
