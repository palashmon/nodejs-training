/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming authentication requests.
 * @help        :: See https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
 */
const UserModel = require('../models/UserModel');
const UserService = require('../services/UserService');
const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');
const ApiResponse = require('../helpers/apiResponse');

/**
 * User registration.
 *
 * @param {string}      firstName
 * @param {string}      lastName
 * @param {string}      email
 * @param {string}      password
 *
 * @returns {Object}
 */
exports.register = [
  // Validate fields.
  body('firstName').isLength({ min: 1 }).trim().withMessage('First name must be specified.'),
  body('lastName')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Last name must be specified.')
    .isAlphanumeric()
    .withMessage('Last name has non-alphanumeric characters.'),
  body('email')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Email must be specified.')
    .isEmail()
    .withMessage('Email must be a valid email address.')
    .custom((value) => {
      return UserModel.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject('E-mail already in use');
        }
      });
    }),
  body('password').isLength({ min: 4 }).trim().withMessage('Password must be 4 characters or greater.'),
  body('role').isLength({ min: 1 }).trim().withMessage("Role ('Patient' or 'Doctor') must be specified."),

  // Sanitize fields.
  sanitizeBody('firstName').escape(),
  sanitizeBody('lastName').escape(),
  sanitizeBody('email').escape(),
  sanitizeBody('password').escape(),

  // Process request after validation and sanitization.
  (req, res) => {
    try {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // Display sanitized values/errors messages.
        return ApiResponse.validationErrorWithData(res, 'Validation Error.', errors.array());
      } else {
        UserService.register(req, res);
      }
    } catch (err) {
      //throw error in json response with status 500.
      return ApiResponse.error(res, err);
    }
  },
];

/**
 * User login.
 *
 * @param {string}      email
 * @param {string}      password
 *
 * @returns {Object}
 */
exports.login = [
  body('email')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Email must be specified.')
    .isEmail()
    .withMessage('Email must be a valid email address.'),
  body('password').isLength({ min: 1 }).trim().withMessage('Password must be specified.'),
  sanitizeBody('email').escape(),
  sanitizeBody('password').escape(),
  (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return ApiResponse.validationErrorWithData(res, 'Validation Error.', errors.array());
      } else {
        UserService.login(req, res);
      }
    } catch (err) {
      return ApiResponse.error(res, err);
    }
  },
];
