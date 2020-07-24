/**
 * Utility Functions
 *
 * @description :: Shared helper functions for some common use cases.
 *
 */

const moment = require('moment');

/**
 * Get next `n` dates from today
 *
 * @param {number} n - Number of dates we need to create
 */
exports.getDates = function (n = 1) {
  const dates = Array.from({ length: n }, (_, i) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + i);
    return currentDate.toLocaleDateString('en-US');
  });
  return dates;
};

/**
 * Get configuration details related to an appointment
 */
exports.getConfig = function () {
  return {
    // Each appointment is of 30 mins each
    appointmentTime: 30,

    // Everyday appointment starts at 10 AM
    firstAppointmentHour: '10:00',

    // Everyday appointment ends at 5 PM
    lastAppointmentHour: '16:00',
  };
};

/**
 * Get only hour And minutes from the JS date object
 *
 */
exports.onlyHourAndMinutes = function (date) {
  if (!date) return date;
  const d = moment(date);
  return d.hours() + ':' + d.minutes();
};

/**
 * Removed duplicates from the array
 *
 * @param {any[]} arr
 */
exports.eliminateDuplicates = function (arr) {
  let i,
    len = arr.length,
    out = [],
    obj = {};

  for (i = 0; i < len; i++) {
    obj[arr[i]] = 0;
  }
  for (i in obj) {
    out.push(i);
  }
  return out;
};

/**
 * Format dates in the array to moment objects
 *
 * @param {any[]} arr
 */
exports.transformToMoment = function (arr) {
  const result = [];
  for (const int = 0; int < arr.length; int++) {
    result.push(moment(arr[int]));
  }
  return result;
};

/**
 * Format dates in the array to 'DD-MM-YYYY hh:mm am/pm' formatted date string
 *
 * @param {any[]} arr
 */
exports.formatDates = function (arr) {
  const result = [];
  for (let int = 0; int < arr.length; int++) {
    result.push(moment(new Date(arr[int])).format('DD-MM-YYYY hh:mm A'));
  }
  return result;
};

/**
 * Capitalize the first letter of a string
 *
 * @param {string} string
 */
exports.capitalize = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
