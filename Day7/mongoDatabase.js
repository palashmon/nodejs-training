const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

// Connection URL
const url = 'mongodb://localhost:27017'

// Database Name
const dbName = 'day7-test-db'
let db = null

// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
  assert.equal(null, err)
  console.log('Connected successfully to mongodb')

  db = client.db(dbName)
  let Inventory = db.collection('inventory')

  Inventory.find({}).toArray(function (err, docs) {
    if (err) {
      console.log('Error caught in find ')
    } else {
      console.log('fetched following records from Inventory')
      console.log(docs)
    }
  })

  client.close()
})
