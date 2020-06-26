/**
 * @file    This Controller controls the requests of the user
 *          and then generates appropriate response which is fed to the viewer.
 * @author  Palash Mondal
 */
const UserModel = require('../models/user.model')

module.exports = {
  getUsers: async function (req, res) {
    try {
      const users = await UserModel.getUsers()
      res.json(users)
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message })
    }
  },
  getUser: async function (req, res) {
    try {
      const { id } = req.params
      if (!Number.isInteger(parseInt(id))) {
        return res.status(400).json({ message: 'ID must be an integer' })
      }
      const user = await UserModel.getUser(Number(id))
      res.json(user)
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message })
    }
  },
  insertUser: async function (req, res) {
    try {
      // Validate user details
      const { email, name } = req.body
      if (!email) return res.status(400).json({ message: 'Email is missing' })
      if (!name) return res.status(400).json({ message: 'User name is missing' })

      // Insert user now
      const user = await UserModel.insertUser(req.body)
      res.json({
        message: `The user #${user.id} has been saved successfully!`,
        content: user,
      })
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message })
    }
  },
  updateUser: async function (req, res) {
    try {
      // Validate user id
      const { id } = req.params
      if (!Number.isInteger(parseInt(id))) {
        return res.status(400).json({ message: 'ID must be an integer' })
      }

      // Validate user details
      const { email, name } = req.body
      if (!email) return res.status(400).json({ message: 'Email is missing' })
      if (!name) return res.status(400).json({ message: 'User name is missing' })

      // Update user now
      const user = await UserModel.updateUser(Number(id), req.body)
      res.json({
        message: `The user #${user.id} has been updated successfully!`,
        content: user,
      })
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message })
    }
  },
  deleteUser: async function (req, res) {
    try {
      // Validate user id
      const { id } = req.params
      if (!Number.isInteger(parseInt(id))) {
        return res.status(400).json({ message: 'ID must be an integer' })
      }
      await UserModel.deleteUser(Number(id))
      res.json({ message: `The user #${id} has been deleted successfully!` })
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message })
    }
  },
}
