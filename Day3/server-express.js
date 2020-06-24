/**
 * @file    This is a the simplest Express app used to show GET & POST requests.
 * @author  Palash Mondal
 */
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const port = 7777

// GET method route
app.get('/', (req, res) => res.send('Hello, World!'))
//=> "Hello, World!"

// Route parameters
// Route path: /users/:userId/books/:bookId
// Request URL: http://localhost:7777/users/34/books/8989
app.get('/users/:userId/books/:bookId', function (req, res) {
  res.send(req.params)
  // req.params: { "userId": "34", "bookId": "8989" }
})

// POST method route
app.post('/', (req, res) => res.send('Got a POST request'))
app.post('/user', (req, res) => res.send('Got a POST request at /user'))

// Extracting POST Data from request using body-parser package
app.post('/post-test', (req, res) => {
  console.log('Got body:', req.body)
  res.json({ body: req.body })
})

app.listen(port, () =>
  console.log(`Started server at http://localhost:${port}`),
)
