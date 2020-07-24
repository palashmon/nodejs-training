/**
 * Error Handler
 *
 * @description :: Shared helper function to handle app errors gracefully
 *
 */

const ApiResponse = require('./apiResponse');

function errorHandler(err, req, res, next) {
  if (err.name == 'UnauthorizedError') {
    return ApiResponse.unauthorized(res, err.message);
  }

  // default to 500 server error
  return ApiResponse.error(res, err.message);
}

module.exports = errorHandler;
