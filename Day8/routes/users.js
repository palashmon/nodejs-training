var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//--===============================================================
// Router-level middleware
//--===============================================================
router.get(
  '/list',
  function (req, res, next) {
    console.log(`\nThis is the first middleware`);
    next();
  },
  function (req, res, next) {
    console.log(`This is the second middleware`);
    next();
  },
  function (req, res, next) {
    console.log(`This is the main route logic...\n`);
    res.send('Respond with a resource');
  },
);

module.exports = router;
