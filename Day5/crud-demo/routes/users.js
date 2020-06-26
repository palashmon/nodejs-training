/**
 * @file    This Routing refers to how an application's endpoints (URIs) respond to client requests.
 * @route   '/users/' - This is the base route
 * @author  Palash Mondal
 */
const express = require('express')
const router = express.Router()
const userController = require('../controllers/index')

/* GET users listing. */
router.get('/', userController.getUsers)
router.get('/:id', userController.getUser)
router.post('/', userController.insertUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router
