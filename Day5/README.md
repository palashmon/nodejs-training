# Nodejs Training: Day 5

## How to create a simple CRUD api using Express.js?

### CRUD operations

For each operation, we will need some JavaScript natives functions.

- Create: [`array.push()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
- Get All Users: [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- Get One User: [`array.find()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
- Update User: `array.find()` and [`array.findIndex()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
- Delete User: `array.find()`and [`array.filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

### File organization

We have organized our code based on role, instead of feature as this a small demo project. We have added some folders and files like controllers, models, routes and data.

- crud-demo
  - controllers
    - index.js (_this is our main controller_)
  - data
    - users.json (_here we have stored our initial users data_)
  - models
    - user.model.js
  - routes
    - index.js
    - users.js (_this is our main `users` api route_)

### Routes

- Create
  - Method: _POST_
  - URL: `http://localhost:3000/users/`
  - Body: `{ "name": "User 4", "email": "user4@email.com" }`
- Get All Users
  - Method: _GET_
  - URL: `http://localhost:3000/users`
- Get One User
  - Method: _GET_
  - URL: `http://localhost:3000/users/2`
- Update User
  - Method: _PUT_
  - URL: `http://localhost:3000/users/2`
  - Body: `{ "id": 2, "name": "User 2a", "email": "user2a@email.com" }`
- Delete User
  - Method: _DELETE_
  - URL: `http://localhost:3000/users/2`

### Testing

All of the API endpoints are tested using [Postman](https://www.postman.com/).
