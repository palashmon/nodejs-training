# Nodejs Training: Day 3

## How do I create a HTTP server?

### Handle `GET` request

Let's take a look at a very simple example:

```js
const http = require('http')

const requestListener = function (req, res) {
  res.writeHead(200)
  res.end('Hello, World!')
}

const server = http.createServer(requestListener)
server.listen(7777)
```

Save this in a file called `server-http.js` - run `node server-http.js`, and your program will hang there... it's waiting for connections to respond to, so you'll have to give it one if you want to see it do anything. Try opening up a browser, and typing `localhost:7777` into the location bar. If everything has been set up correctly, you should see your server saying `Hello, World!`

### Handle `POST` request

```js
const http = require('http')

http
  .createServer((req, res) => {
    if (request.method === 'POST') {
      let body = []
      request
        .on('data', (chunk) => {
          body.push(chunk)
        })
        .on('end', () => {
          body = Buffer.concat(body).toString()
          response.end(body)
        })
    } else {
      res.writeHead(200)
      res.end('Hello, World!')
    }
  })
  .listen(7777)
```

If we now use [Postman](https://www.postman.com/), which is a collaboration platform for API development, and create a POST request to url `localhost:7777` and set the request body with key-value pair like `{ "name": "Palash" }` we can see the same response after clicking the `Send` button.

## How do I create a simplest Express app?

### Handle `GET` request

Below is essentially the simplest Express app you can create.

```js
const express = require('express')
const app = express()
const port = 7777

app.get('/', (req, res) => res.send('Hello, World!'))

app.listen(port, () =>
  console.log(`Started server at http://localhost:${port}`),
)
```

This app starts a server and listens on port 7777 for connections. The app responds with `Hello, World!` for requests to the root URL (`/`) or route. For every other path, it will respond with a _404 Not Found_.

### Handle `POST` request

Respond to POST request on the root route (`/`), the application's home page:

```js
app.post('/', (req, res) => res.send('Got a POST request'))
```

Respond to a POST request to the `/user` route:

```js
app.post('/user', (req, res) => res.send('Got a POST request at /user'))
```

## Express application generator

Use the application generator tool, `express-generator`, to quickly create an application skeleton.

You can run the application generator with the npx command (available in Node.js 8.2.0).

```bash
npx express-generator myapp
```

Then install dependencies:

```bash
cd myapp
npm install
```

Next, run the app with this command:

```bash
npm start
```

Then load `http://localhost:3000/` in your browser to access the app.
