/**
 * Api Response
 *
 * @description :: Shared helper functions to display API responses
 *
 */

exports.success = function (res, msg) {
  const data = {
    status: true,
    message: msg,
  };
  return res.status(200).json(data);
};

exports.successWithData = function (res, msg, data) {
  const resData = {
    status: true,
    message: msg,
    data: data,
  };
  return res.status(200).json(resData);
};

exports.error = function (res, msg) {
  const data = { message: msg };
  return res.status(500).json(data);
};

exports.notFound = function (res, msg) {
  const data = {
    status: false,
    message: msg,
  };
  return res.status(404).json(data);
};

exports.validationErrorWithData = function (res, msg, data) {
  const resData = {
    status: false,
    message: msg,
    data: data,
  };
  return res.status(400).json(resData);
};

exports.unauthorized = function (res, msg) {
  const data = { message: msg };
  return res.status(401).json(data);
};
