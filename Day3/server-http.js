/**
 * @file    This is a simple server using node's HTTP module
 * @author  Palash Mondal
 */
const http = require('http')

const port = 7777
http
  .createServer((req, res) => {
    // Check if this is a GET or POST request before processing
    if (req.method === 'POST') {
      let body = []
      req
        .on('data', (chunk) => {
          body.push(chunk)
        })
        .on('end', () => {
          body = Buffer.concat(body).toString()
          res.end(body)
        })
    } else {
      res.writeHead(200)
      res.end('Hello, World!')
    }
  })
  .listen(port, () => {
    console.log(`\nServer is running on: http://localhost:${port}/`)
  })
