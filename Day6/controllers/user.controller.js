const UserService = require('../services/user.service')

/**
 * Get list of all the saved users
 */
function getUsers(req, res) {
  let users = UserService.find()
  res.render('users/index', { users, title: 'User List' })
}

/**
 * Get the save new user view
 */
function getUser(req, res) {
  res.render('users/create', { title: 'Create New User' })
}

/**
 * Save a new user to the database
 */
function saveUser(req, res) {
  const params = req.body
  UserService.save(params) // callback
  res.redirect('/users')
}

module.exports = {
  getUsers,
  getUser,
  saveUser,
}
