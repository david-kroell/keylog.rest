var express = require('express');
var router = express.Router();

/**
 * @api {get} / Info landing page
 * @apiDescription This is just the landing page, if you do not know how to use,
 * this provides some basic information about this software.
 * 
 * @apiName InfoPage
 * @apiGroup Info
 *
 */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

module.exports = router;
