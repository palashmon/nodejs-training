module.exports = {
  /**
   * @param {number} a This is the first value for addition
   * @param {number} b This is the second value for addition
   */
  add: (a, b) => a + b,

  /**
   * @param {number} a
   * @param {number} b
   */
  subtract: (a, b) => a - b,

  /**
   * @param {number} a
   * @param {number} b
   */
  multiply: (a, b) => a * b,

  /**
   * @param {number} a
   * @param {number} b
   */
  divide: (a, b) => (b !== 0 ? a / b : undefined),
};
