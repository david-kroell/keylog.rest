var express = require('express');
var router = express.Router();
var path = require('path');
const fs = require('fs');

/* GET payload info */
router.get('/', function(req, res, next) {
  var basepath = path.join(__dirname, '../public/payloads');

  fs.readdir(basepath, (err, files) => {
    res.json({ description: 'Listing of available payloads', payloads: files });
  });
});

/* GET payload */
router.get('/:file', function(req, res, next) {
  var file = path.join(__dirname, '../public/payloads', req.params.file );
  res.download(file);
});

module.exports = router;
