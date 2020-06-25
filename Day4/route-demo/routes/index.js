var express = require('express')
var router = express.Router()
var indexController = require('../controllers/index')

/* GET home page. */
router.get('/', indexController.getHomeRoute)
router.get('/about', indexController.getAboutRoute)
router.get('/user/:name', indexController.getParamRoute)

module.exports = router
