/*
 a function(anonymous/named)
  passed as an argument to another function
*/

function getUsersFromDB() {
  // fetch all the users
  // dbConn
  // .collection("users")
  // .find({})
  // .toArray(function(err, docs) {
  //   return docs;
  // });

  setTimeout(function () {
    return [
      {
        fname: 'john',
        email: 'doe@john.com',
      },
    ];
  }, 1000);
  return 1;
}

// function init() {
//   const result = getUsersFromDB();
//   console.log("result :", result);
// }
// init();

function getUsersFromDBAsync(callback) {
  setTimeout(function () {
    return callback(null, [
      {
        fname: 'john',
        email: 'doe@john.com',
      },
    ]);
  }, 1000);
}

(function () {
  // const result = getUsersFromDB();
  // console.log("result :", result);

  getUsersFromDBAsync(function (err, result) {
    if (err) {
      console.log('err: ', err);
    } else {
      console.log('result: ', result);
    }
  });
})(); //IIFE

function fooAsync(cb) {
  return cb(null, 'Hello');
}

fooAsync(function (err, result) {
  if (err) {
    console.log('err: ', err);
  } else {
    console.log('result: ', result);
  }
});
