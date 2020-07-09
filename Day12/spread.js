abc = ['a', 'b', 'c'];

def = ['d', 'e', 'f'];
abcdef = [...abc, ...def];

// console.log("abcdef :", abcdef)

// result = Array.prototype.push.apply(abc, def);
// object

fruits = ['Apple', 'Orange'];
drinks = ['milk'];

breakfast = ['Cornflakes', ...fruits, ...drinks];

// console.log("breakfast: ", breakfast);

let student = {
  fname: 'test',
  lname: 'test',
};

marks = {
  physics: 70,
  chemistry: 80,
};

studentMark = { ...student, ...marks };
console.log('studentMark: ', studentMark);
