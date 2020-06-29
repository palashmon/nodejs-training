const db = require('diskdb')
db.connect('db', ['users'])

module.exports = {
  find: function () {
    return db.users.find()
  },
  save: function (params) {
    db.users.save(params)
  },
  edit: function () {},
  delete: function () {},
  archive: function () {},
}
