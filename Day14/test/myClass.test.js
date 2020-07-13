//@ts-nocheck
const MyClass = require('../src/myclass.js');
const sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
const chaiAsPromise = require('chai-as-promised');
chai.use(chaiAsPromise);
const nock = require('nock');

const myObj = new MyClass();

describe('Test suite', function () {
  beforeEach(function () {
    // Sinon wrappers must be restored before or after a test case.
    // Hooks makes it easier implement
    sinon.restore();
  });

  describe('Setup and first unit test', function () {
    it('test the add method', function () {
      expect(myObj.add(1, 2)).to.be.equal(3);
    });
  });

  describe('Using Spy', function () {
    it('spy the add method', function () {
      var spy = sinon.spy(myObj, 'add');
      var arg1 = 10,
        arg2 = 20;
      myObj.callAnotherFn(arg1, arg2);
      expect(spy.calledOnce).to.be.true;
      expect(spy.calledWith(10, 20)).to.be.true;
    });

    it('spy the callback method', function () {
      var callback = sinon.spy();
      myObj.callTheCallback(callback);
      expect(callback.calledOnce).to.be.true;
    });
  });

  describe('Using Mock', function () {
    it('mock the sayHello method', function () {
      var mock = sinon.mock(myObj);
      var expectation = mock.expects('sayHello');
      expectation.exactly(1);
      expectation.withArgs('hello world');
      myObj.callAnotherFn(10, 20);
      mock.verify();
    });
  });

  describe('Using Stub', function () {
    it('Stub the add method', function () {
      var stub = sinon.stub(myObj, 'add');
      stub.withArgs(10, 20).onFirstCall().returns(100).onSecondCall().returns(200);
      expect(myObj.callAnotherFn(10, 20)).to.be.equal(100);
      //expect(myObj.callAnotherFn(10, 20)).to.be.equal(200);
    });
  });

  describe('Test the promise', function () {
    it('Promise test case', function (done) {
      this.timeout(4000);
      myObj.testPromise().then(function (result) {
        expect(result).to.be.equal(6);
        done();
      });
    });

    it('Promise test case with chai-as-promised', function () {
      this.timeout(0);
      return expect(myObj.testPromise()).to.eventually.equal(6);
    });
  });

  describe('Async test suite', function () {
    it('Mock and stub async call', function (done) {
      var obj = { userId: 1, id: 1 };
      const scope = nock('https://jsonplaceholder.typicode.com').get('/todos/1').reply(200, obj);

      myObj
        .getAsyncData()
        .then(function (result) {
          expect(result).to.be.eql(obj);
          done();
        })
        .catch((error) => {
          done(new Error('test case failed: ' + error));
        });
    });
  });
});
