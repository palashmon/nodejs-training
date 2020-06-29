var express = require('express')
var router = express.Router()
const UserController = require('../controllers/user.controller')

/* GET users listing. */
router.get('/', UserController.getUsers)
router.get('/create', UserController.getUser)
router.post('/save', UserController.saveUser)

module.exports = router
