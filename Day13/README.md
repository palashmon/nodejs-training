# Nodejs Training: Day 13

## Test-Driven Development (TDD)

The **Test-Driven Development** (TDD) is a software engineering process that requires unit tests to be written before the code they are supposed to validate that relies on the repetition of a very short development cycle, where the requirements are transformed in test cases. With this, firstly the code will fail (miserably), then the developer should write clean code that works to make the tests pass.

![tdd](https://miro.medium.com/max/1000/1*Tkjb8QNSSpH8Khz5dMAjWQ.png)

## Mocha

[**Mocha**](https://mochajs.org/) is a JavaScript test framework running on Node.js and in the browser. Mocha allows asynchronous testing, test coverage reports, and use of any assertion library.

## Chai

[**Chai**](https://www.chaijs.com/) is a BDD / TDD assertion library for NodeJS and the browser that can be delightfully paired with any javascript testing framework.

Basically, mocha is a framework and chai is a library. Let's go a little deeper in mocha.

## Mocha: how can I test?

Mocha uses hooks to organize its structure. Let's talk about them.

- **describe()**: It's used to group, which you can nest as deep.
- **it()**: It's the test case.
- **before()**: It's a hook to run before the first it() or describe().
- **beforeEach()**: It's a hook to run before each it() or describe().
- **after()**: It's a hook to run after it() or describe().
- **afterEach()**: It's a hook to run after each it() or describe().

To see it working, let's do a simple case: A calculator. Let's create a test case where our calculator should calculate the following operations:

- Addition
- Subtraction
- Multiplication
- Division
