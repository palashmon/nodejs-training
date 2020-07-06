let { prom1, prom2, prom3 } = require('./promises');

prom1()
  .then((prom1Result) => {
    console.log(prom1Result);
    return prom2();
  })
  .then((prom2Result) => {
    console.log(prom2Result);
    return prom3();
  })
  .then((prom3Result) => console.log(prom3Result))
  .catch((err) => console.log(err));
