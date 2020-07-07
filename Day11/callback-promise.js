// function saveUserToDb(user) {
//   return new Promise((resolve, reject) => {
//     User.save(user, function(err, status) {
//       if(err) {
//         return reject(err);
//       } else {
//         return resolve(status);
//       }
//     });
//   });
// }

async function saveUserToDb(user) {
  User.save(user, function (err, status) {
    if (err) {
      return err;
    } else {
      return status;
    }
  });
}

async function exec() {
  let status = await saveUserToDb({ fname: 'john', lname: 'doe' });
}
