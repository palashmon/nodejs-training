// We are using the same promise here from promise.js
let promise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    let outcome = Math.round(Math.random());
    if (outcome) {
      resolve('got data');
    } else {
      reject('got some error');
    }
  }, 0);
});

// But here using async/await instead
async function init() {
  try {
    let value = await promise; // wait until the promise resolves (*)
    console.log('got my value :', value);
  } catch (error) {
    console.log('oops! there is an error');
  }
}

init();
