let promise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    let outcome = Math.round(Math.random());
    if (outcome) {
      resolve('got data');
    } else {
      reject('got some error');
    }
  }, 1000);
});

promise
  .then(function (value) {
    console.log('got my value :', value);
  })
  .catch(function (err) {
    console.log('oops! there is an error');
  });
