# Nodejs Training: Day 1

### What Is Node.js?

[Node.js](https://nodejs.org/en/) is a powerful framework developed on Chrome's V8 JavaScript engine that compiles the JavaScript directly into the native machine code. It is a lightweight framework used for creating server-side web applications and extends JavaScript API to offer usual server-side functionalities. It is generally used for large-scale application development, especially for video streaming sites, single page application, and other web applications.

### What are synchronous and asynchronous code?

**Synchronous way**: It waits for each operation to complete, after that only it executes the next operation.

**Asynchronous way**: It never waits for each operation to complete, rather it executes all operations in the first GO only. The result of each operation will be handled once the result is available.

### What are the use cases where Node.js can be used?

- Real-Time Web Applications
- Network Applications
- Backends and servers
- Developing API
- Microservices

### How Node.js differ from traditional web servers?

Compared to traditional web-serving techniques where each connection (request) spawns a new thread, taking up system RAM and eventually maxing-out at the amount of RAM available, Node.js operates on a single-thread, using non-blocking I/O calls, allowing it to support tens of thousands of concurrent connections held in the event loop.

![single-thread](https://qph.fs.quoracdn.net/main-qimg-e479159c96b0aa25d8f095cd1b72ef9c.webp)

### What is an Event loop in Node.js and how does it work?

An event loop in Node.js handles all the asynchronous callbacks in an application. It is one of the most important aspects of Node.js and the reason behind Node.js have non-blocking I/O. Since Node.js is an event-driven language, you can easily attach a listener to an event and then when the event occurs the callback will be executed by the specific listener. Whenever functions like `setTimeout`, `http.get`, and `fs.readFile` are called, Node.js executed the event loop and then proceeds with the further code without waiting for the output. Once the entire operation is finished, Node.js receives the output and then executes the callback function. This is why all the callback functions are placed in a queue in a loop. Once the response is received, they are executed one by one.

![event-loop](https://devopedia.org/images/article/131/2362.1540794088.jpg)
