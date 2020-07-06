const { prom1, prom2, prom3 } = require('./promises');

Promise.all([prom1(), prom2(), prom3()])
  .then((arr) => {
    console.log('\nPromise resolved: ', arr);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(function () {
    console.log('\nFinally the promise is settled, i.e either fulfilled or rejected');
  });
