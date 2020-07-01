const config = require('config')
const mysql = require('mysql')
const conn = mysql.createConnection(config.get('mysqlConnection'))
conn.connect()

module.exports = conn
