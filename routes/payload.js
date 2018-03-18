var express = require('express');
var router = express.Router();
var path = require('path');
const fs = require('fs');
const config = require('../config');
const exceptFiles = [
  'error.hbs'
]

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
      if(exceptFiles.indexOf(file) == -1){
        // add to custom array
        filesWithoutExtension.push(file);
      }
      // send response after loop finished
      itemsProcessed++;

      if(itemsProcessed === files.length) {
        res.json({ description: 'Listing of available payloads', payloads: filesWithoutExtension });
      }
    });
  });
});

/**
 * @api {get} /payloads/:payloadName Get content of specific payload
 * @apiName GetPayloads
 * @apiGroup Payloads
 *
 * @apiSuccess {String} PayloadName preprocessed payload script file
 */
router.get('/:file', function(req, res, next) {
  var file = path.join(__dirname, '../payloads', req.params.file );

  fs.exists(file, (exists) => {
    res.download(file);
  });
});

module.exports = router;
