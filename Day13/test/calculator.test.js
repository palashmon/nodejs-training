/**
 * Mocha Guide to Testing
 * Objective is to explain describe(), and it() hooks
 *
 * 1. `describe()` is merely for grouping, which you can nest as deep
 * 2. `it()` is a test case
 */
//@ts-nocheck
const { expect } = require('chai');
const calculator = require('../src/calculator');

// describe() are:
// - commonly known as test suites, which contains test cases
// - merely groups, and you can have groups within groups
describe('Calculator', () => {
  // 2 test cases in 1 test suite
  describe('Addition', () => {
    it('1 + 1 should be equals to 2', () => {
      expect(calculator.add(1, 1)).to.equal(2);
    });
    it('should sum two numbers', () => {
      expect(calculator.add(2, 2)).to.equal(4);
      expect(calculator.add(50, 30)).to.equal(80);
      expect(calculator.add(-21, 22)).to.equal(1);
      expect(calculator.add(1000000, 5656556)).to.equal(6656556);
    });
  });

  describe('Subtraction', () => {
    it('1 - 1 should be equals to 0', () => {
      expect(calculator.subtract(1, 1)).to.equal(0);
    });
    it('should subtract two numbers', () => {
      expect(calculator.subtract(6, 2)).to.equal(4);
      expect(calculator.subtract(50, 30)).to.equal(20);
      expect(calculator.subtract(-21, 22)).to.equal(-43);
      expect(calculator.subtract(1000000, 5656556)).to.equal(-4656556);
    });
  });

  describe('Multiplication', () => {
    it('1 * 1 should be equals to 1', () => {
      expect(calculator.multiply(1, 1)).to.equal(1);
    });
    it('should multiply two numbers', () => {
      expect(calculator.multiply(2, 2)).to.equal(4);
      expect(calculator.multiply(50, 30)).to.equal(1500);
      expect(calculator.multiply(-21, 22)).to.equal(-462);
      expect(calculator.multiply(-10, -20)).to.equal(200);
    });
  });

  describe('Division', () => {
    it('1 / 1 should be equals to 1', () => {
      expect(calculator.divide(1, 1)).to.equal(1);
    });
    it('should divide two numbers', () => {
      expect(calculator.divide(4, 2)).to.equal(2);
      expect(calculator.divide(40, 4)).to.equal(10);
      expect(calculator.divide(-20, 2)).to.equal(-10);
    });
    it('should return undefined if the denominator is zero', () => {
      expect(calculator.divide(2, 0)).to.equal(undefined);
      expect(calculator.divide(100, 0)).to.equal(undefined);
      expect(calculator.divide(-20, 0)).to.equal(undefined);
    });
  });
});
