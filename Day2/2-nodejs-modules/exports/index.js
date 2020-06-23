/**
 * @file    Here we simply consume the local `circle.js` module using `require`
 * @author  Palash Mondal
 */
const circle = require('./circle');

const r = 4;
console.log(`Circle with radius ${r} has
  Area: ${circle.area(r)};
  Circumference: ${circle.circumference(r)}`);

// Output =>
// Circle with radius 4 has
//  Area: 50.26548245744;
//  Circumference: 25.13274122872
