/**
 * @param {string} fname
 * @param {string} lname
 */
function printStudentInfo(fname, lname) {
  return ' Your"s ' + fname + ' ' + lname;
}

/**
 * @param {string} fname
 * @param {string} lname
 */
function printStudent1(fname, lname) {
  return `
  Your name is ${fname} ${lname}

  test
  `;
}
let fullName = printStudent1('john', 'doe');
console.log(fullName);
