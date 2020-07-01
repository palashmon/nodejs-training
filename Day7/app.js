var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
const db = require('./database')
const mongoDb = require('./mongoDatabase')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

app.get('/users', function (req, res) {
  db.query('SELECT * FROM users', function (err, result, fields) {
    if (err) {
      res.json(err)
    } else {
      console.log('result: ', result)
      console.log('fields: ', fields)
      res.json(result)
    }
  })
})

app.post('/users', function (req, res) {
  let { id, fname, lname, email, password } = req.body
  db.query(
    ' INSERT INTO users ( id, fname, lname,  password ) values (?,  ?,  ?,  ?,  ?) ',
    [id, fname, lname, email, password],
    function (err, result, fields) {
      if (err) {
        res.json({ error: true, message: err.message })
        // res.json(err);
      } else {
        res.json(result)
      }
    },
  )
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
