var express = require('express');
var router = express.Router();
var path = require('path');
const fs = require('fs');
const config = require('../config');

/**
 * @api {get} /payloads/ Request listing of available payloads
 * @apiName GetAllPayloads
 * @apiGroup Payloads
 *
 * @apiSuccess {Array} payloads available payloads
 */
router.get('/', function(req, res, next) {
  var basepath = path.join(__dirname, '../payloads');
  var itemsProcessed = 0;
  var filesWithoutExtension = [];

  fs.readdir(basepath, (err, files) => {
    files.forEach( (file) => {
      file = file.replace(/\.[^/.]+$/, "");

      // add to custom arraz
      filesWithoutExtension.push(file);

      // send response after loop finished
      itemsProcessed++;
      if(itemsProcessed === files.length) {
        res.json({ description: 'Listing of available payloads', payloads: filesWithoutExtension });
      }
    });
  });
});

/* GET payload */
router.get('/:file', function(req, res, next) {
  req.params.file.substring( 0, req.params.file.indexOf( ".hbs" ) );
  
  res.render(req.params.file, config.payload);
});

module.exports = router;
