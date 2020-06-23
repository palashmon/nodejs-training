# Nodejs Training: Day 2

### Installing Node.js to get started

We can [download](https://nodejs.org/en/) Node.js version 12, which is recommended for most users as on June 23, 2020.

To verify that you have Node.js up and running, run this:

```bash
node --version
```

or just

```bash
node -v
```

If everything is ok, it will return the version number of the currently active Node.js binary.

### A very simple Node.js application

Let's start with creating a file called `index.js`

```js
// index.js
console.log('Hello from Node.js');

function add(x, y) {
  return x + y;
}

let sum = add(1, 2);
console.log('Sum: ', sum);
```

We can now run our file using the command

```bash
node index.js
```

We can see that it will print the output into the terminal.

### Node.js modules: require, exports, imports

**Require**: `require` are used to consume modules. It allows us to include modules in our programs. We can add built-in core Node.js modules, community-based modules (`node_modules`), and local modules.

**Exports**: The `exports` keyword gives us the chance to "export" our objects and methods. After that we can consume it using `require` in any other file.

Note: We prefix the module name with `./`. That indicates that the module is a local file.

**Imports**: Starting with version 8.5.0+, Node.js supports ES modules natively with a feature flag and new file extension `*.mjs`.

### Node.js Callback

A **callback** is a function which is called when a task is completed, thus helps in preventing any kind of blocking and a callback function allows other code to run in the meantime. Callback is called when task get completed and is asynchronous equivalent for a function. Using Callback concept, Node.js can process a large number of requests without waiting for any function to return the result which makes Node.js highly scalable. For example: In Node.js, when a function start reading file, it returns the control to execution environment immediately so that the next instruction can be executed. Once file I/O gets completed, callback function will get called to avoid blocking or wait for File I/O.

### What Is NPM?

NPM is the package manager used by Node.js applications - we can find a ton of modules here, so that we don't have to reinvent the wheel. There are two primary interfaces you will interact with - the NPM website and the NPM command line toolkit.

The NPM website

- https://www.npmjs.com/

The Command Line Interface (CLI)

- The NPM is bundled with the Node.js binary, so we don't have to install it. To verify that we have NPM up and running, run this:

  ```bash
  npm -v
  ```

  If everything is ok, it will return the version number of the installed npm.

### Using NPM

1. Using `npm init` to Initialize a Project

   The `npm init` command is a step-by-step tool to scaffold out our project. It will prompt us for input for a few aspects of the project in a order.

   ```bash
   npm init
   ```

2. Install Modules with `npm install`

   Installing modules from npm is one of the most basic things we should learn to do when getting started with npm. We can do it like:

   ```bash
   npm install <module>
   ```

   In the above command, you'd replace `<module>` with the name of the module we want to install. For example, if you want to install [Lodash](https://lodash.com/) we could run the following command:

   ```bash
   npm install lodash
   ```

3. Install modules and save them to your package.json as a dependency

   When we're running `npm install` to install a module, we can add the optional flag `--save` to the command. This flag will add the module as a dependency of our project to the project's `package.json` as an entry in `dependencies`.

   ```bash
   npm install <module> --save
   ```

4. Install Modules and Save Them to Your package.json as a Developer dependency

   When we're running `npm install` to install a module, we can add the optional flag `--save-dev` to the command. This flag will add the module as a development dependency of our project to the project's `package.json` as an entry in `devDependencies`.

   ```bash
   npm install <module> --save-dev
   ```

5. Install Modules Globally on your System

   To install a module from npm globally, we'll simply need to use the `--global` or `-g` flag when running the install command to have the module install globally, rather than locally (to the current directory).

   ```bash
   npm install <module> -g
   ```
