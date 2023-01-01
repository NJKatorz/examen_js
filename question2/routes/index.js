/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-var */
/* eslint-disable prefer-arrow-callback */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
