const { chai, server, should } = require('./testConfig');
const UserModel = require('../models/UserModel');

/**
 * Test cases to test all the authentication APIs
 * Covered Routes:
 * (1) Login
 * (2) Register
 */

describe('Auth', () => {
  // Before each test we empty the test database
  before((done) => {
    UserModel.deleteMany({}, (err) => {
      done();
    });
  });

  // Prepare data for testing
  const testData = {
    firstName: 'test',
    lastName: 'user',
    password: '1234',
    email: 'test@test.com',
    role: 'Patient',
  };

  /*
   * Test the /POST route
   */
  describe.only('/POST Register', () => {
    it('It should send validation error for Register', (done) => {
      chai
        .request(server)
        .post('/api/auth/register')
        .send({ email: testData.email })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('It should Register user', (done) => {
      chai
        .request(server)
        .post('/api/auth/register')
        .send(testData)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Registration Success.');
          testData._id = res.body.data._id;
          done();
        });
    });
  });

  /*
   * Test the /POST route
   */
  describe.only('/POST Login', () => {
    it('It should send validation error for Login', (done) => {
      chai
        .request(server)
        .post('/api/auth/login')
        .send({ email: testData.email })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('it should Send failed user Login', (done) => {
      chai
        .request(server)
        .post('/api/auth/login')
        .send({ email: 'admin@admin.com', password: '1234' })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('it should do user Login', (done) => {
      chai
        .request(server)
        .post('/api/auth/login')
        .send({ email: testData.email, password: testData.password })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Login Success.');
          done();
        });
    });
  });
});
