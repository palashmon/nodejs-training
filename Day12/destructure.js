// function studentInfo() {

//   let user  = { fname: 'john', lname: 'doe', email: 'a@b.com', phone: 100 };
//   let fname = user.fname;
//   let lname = user.lname
//   // let student = await getStudent(1);
//   return {
//     fname,
//     lname
//   }
// }

// app.post('/users', function(req, res, next) {
//   let { fname, lname, email } = req.body;
// });

// console.log("info :", studentInfo());

// arr = ['john', 1, 'Coffee', 'WFH'];

// let [ a, b, c] = arr;

/**
 * @param {number} id
 */
function getUser(id) {
  return new Promise((resolve, reject) => {
    return setTimeout(function () {
      return resolve(id); // return user
    }, 1000);
  });
}

async function init() {
  let arr = [1, 3, 5, 7];

  let allPromises = [];
  for (let i = 0; i < arr.length; ++i) {
    allPromises.push(getUser(arr[i]));
  }
  let [user1, user3, user5, user7] = await Promise.all(allPromises);
  console.log(user1, user3, user5, user7);
}
init();
