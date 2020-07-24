/**
 * Authorize Middleware
 *
 * @description :: Router-level middleware to handle Authorization for the routes
 * @help        :: See https://expressjs.com/en/guide/using-middleware.html
 */

const jwt = require('express-jwt');
const ApiResponse = require('../helpers/apiResponse');
const secret = process.env.JWT_SECRET;

/**
 * Add a authorize middleware based on role
 * @param {Array | String} roles
 */
function authorize(roles = []) {
  // roles param can be a single role string (e.g. Role.Patient or 'Patient')
  // or an array of roles (e.g. [Role.Patient, Role.Doctor] or ['Patient', 'Doctor'])
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    // authenticate JWT token and attach user to request object (req.user)
    jwt({ secret }),

    // authorize based on user role
    (req, res, next) => {
      if (roles.length && !roles.includes(req.user.role)) {
        // user's role is not authorized
        return ApiResponse.unauthorized(res, 'Unauthorized');
      }

      // authentication and authorization successful
      next();
    },
  ];
}

const authenticate = jwt({
  secret: secret,
});

module.exports = authorize;
