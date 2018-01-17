var express = require('express');
var router = express.Router();
var path = require('path');
const fs = require('fs');
const config = require('../config');
const exceptFiles = [
  'error.hbs',
  'layouts'
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
      console.log(file)
      if(exceptFiles.indexOf(file) == -1){
        file = file.replace(/\.[^/.]+$/, "");
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
 * @api {get} /payloads/{PayloadName} Get content of specific payload
 * @apiName GetPayloads
 * @apiGroup Payloads
 *
 * @apiSuccess {String} preprocessed payload script file
 */
router.get('/:file', function(req, res, next) {
  fs.exists('../payloads/' + req.params.file + '.hbs', (exists) => {
    res.render(req.params.file + '.hbs', config.payload);
  });
});

module.exports = router;
