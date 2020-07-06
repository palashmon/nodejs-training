function myProm() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve('myProm returned some data');
    }, 1000);
  });
}

function AnotherProm(res) {
  return new Promise(
    (resolve) =>
      setTimeout(() => {
        console.log('Inside AnotherProm --->');
        resolve(res);
      }),
    2000,
  );
}

function yetAnotherProm(res) {
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log('Inside yetAnotherProm --->');
      resolve(res);
    }, 2000),
  );
}

myProm()
  .then((res) => {
    return AnotherProm(res);
  })
  .then((anotherResult) => {
    return yetAnotherProm(anotherResult);
  })
  .then((result) => {
    console.log(result);
  })
  .catch((err) => console.log(err));
