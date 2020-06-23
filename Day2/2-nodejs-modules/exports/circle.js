/**
 * @file    Here we are exporting the area and circumference functions
 *          We have defined the PI constant, but this is only accessible within the module.
 *          Only the elements associated with exports are available outside the module.
 * @author  Palash Mondal
 */
const PI = 3.14159265359;

exports.area = radius => (radius ** 2) * PI;
exports.circumference = radius => 2 * radius * PI;
