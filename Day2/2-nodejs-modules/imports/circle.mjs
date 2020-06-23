/**
 * @file    Here, our previous `circle.js` is rewritten as `circle.mjs`
 *          We are exporting the area and circumference functions
 *          We have defined the PI constant, but this is only accessible within the module.
 *          Only the elements associated with exports are available outside the module.
 * @author  Palash Mondal
 */
const PI = 3.14159265359;

export function area(radius) {
  return radius ** 2 * PI;
}

export function circumference(radius) {
  return 2 * radius * PI;
}
