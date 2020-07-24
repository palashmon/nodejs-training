//During the automated test the env variable, We will set it to "test"
require('dotenv').config();
process.env.NODE_ENV = 'test';
process.env.MONGODB_URL = process.env.MONGODB_URL_TEST;

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
chai.use(chaiHttp);

//Export this to use in multiple files
module.exports = {
  chai: chai,
  server: server,
  should: should,
};
