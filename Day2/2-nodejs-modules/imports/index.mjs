/**
 * @file    Here we can consume the local `circle.mjs` module using `import`
 *          We can run this module using the experimental module feature flag:
 *          node --experimental-modules index.mjs
 * @author  Palash Mondal
 */
import { area, circumference } from './circle.mjs';

const r = 4;
console.log(`Circle with radius ${r} has
  Area: ${area(r)};
  Circumference: ${circumference(r)}`);

// Output =>
// ExperimentalWarning: The ESM module loader is experimental.
// Circle with radius 4 has
//  Area: 50.26548245744;
//  Circumference: 25.13274122872
