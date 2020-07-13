//@ts-nocheck
const axios = require('axios');

class MyClass {
  constructor() {
    //console.log('initiate');
  }

  /**
   * @param {string} str
   */
  sayHello(str) {
    // console.log(str);
    return str;
  }

  /**
   * @param {number} arg1
   * @param {number} arg2
   */
  add(arg1, arg2) {
    var result;
    result = arg1 + arg2;
    return result;
  }

  /**
   * @param {number} arg1
   * @param {number} arg2
   */
  callAnotherFn(arg1, arg2) {
    this.sayHello('hello world');
    var result = this.add(arg1, arg2);
    return result;
  }

  /**
   * @param {() => void} callback
   */
  callTheCallback(callback) {
    callback();
  }

  async testPromise() {
    const result = await new Promise(function (resolve, reject) {
      setTimeout(() => resolve(3), 3000);
    });
    return result * 2;
  }

  async getAsyncData() {
    try {
      const result = await new Promise((resolve, reject) => {
        axios
          .get('https://jsonplaceholder.typicode.com/todos/1')
          .then((response) => resolve(response.data))
          .catch((error) => reject(error));
      });
      return result;
    } catch (error) {
      return error;
    }
  }
}

module.exports = MyClass;
