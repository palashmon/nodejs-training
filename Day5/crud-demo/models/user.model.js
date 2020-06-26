/**
 * @file    This Model represents the structure of data, the format and the constraints with which it is stored.
 *          It maintains the data of the application. Essentially, it is the database part of the application.
 * @author  Palash Mondal
 */
let users = require('../data/users.json')

/**
 * Get all the users from the array of objects, if array exists.
 */
function getUsers() {
  return new Promise((resolve, reject) => {
    if (users.length === 0) {
      reject({
        message: 'No user found. Please add a new user first.',
        status: 202,
      })
    }
    resolve(users)
  })
}
/**
 * Get specific user based on the passed id from the url.
 * @param {number} id
 */
function getUser(id) {
  return new Promise((resolve, reject) => {
    getDataById(users, id)
      .then((user) => resolve(user))
      .catch((err) => reject(err))
  })
}
/**
 * Insert a new User into the `users` array.
 * @param {{ id: number; name: string; email: string; }} newUser
 */
function insertUser(newUser) {
  return new Promise((resolve, reject) => {
    const id = { id: getNewId(users) }
    newUser = { ...id, ...newUser }
    users.push(newUser)
    resolve(newUser)
  })
}
/**
 * Update a User based on the passed id from the url.
 * @param {number} id
 * @param {{ id: number; name: string; email: string; }} updateUser
 */
function updateUser(id, updateUser) {
  return new Promise((resolve, reject) => {
    getDataById(users, id)
      .then(({ id }) => {
        const index = users.findIndex((usr) => usr.id === id)
        const updateUserId = { id }
        users[index] = { ...updateUserId, ...updateUser }
        resolve(users[index])
      })
      .catch((err) => reject(err))
  })
}
/**
 * Delete a User based on the passed id from the url.
 * @param {number} id
 */
function deleteUser(id) {
  return new Promise((resolve, reject) => {
    getDataById(users, id)
      .then(() => {
        users = users.filter((usr) => usr.id !== id)
        resolve()
      })
      .catch((err) => reject(err))
  })
}

/**
 * Check if an id exists in the array
 * @param {any[]} array
 * @param {number} id
 */
function getDataById(array, id) {
  return new Promise((resolve, reject) => {
    const row = array.find((r) => r.id === id)
    if (!row) {
      reject({
        message: 'ID not found',
        status: 404,
      })
    }
    resolve(row)
  })
}

/**
 * This function is used to create id for a new record,
 * based on the array the last id and increment it by 1 to return a new id.
 * @param {any[]} array
 */
function getNewId(array) {
  if (array.length > 0) {
    return array[array.length - 1].id + 1
  } else {
    return 1
  }
}

module.exports = {
  insertUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
}
