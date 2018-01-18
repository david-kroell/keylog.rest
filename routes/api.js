var path = require('path');
var express = require('express');
var router = express.Router();
const config = require('../config');

// set up database
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    dialect: config.db.dialect,
    storage: config.db.sqliteFile
});

const Victim = sequelize.import(path.join(__dirname, '../models/victim'));
const Log = sequelize.import(path.join(__dirname, '../models/log'));
Log.belongsTo(Victim);

sequelize.sync();

  Victim.create({
    ip: '39.136.14.94',
    country: 'Austria',
    region: 'Vienna',
    city: 'Vienna',
    macAdress: 'aa-aa-aa-aa-aa-aa',
    os: 'linux'
  })

router.use('/victims', (req, res, next) => {
    // grab api key from various request methods
    var apikey = req.header('X-API-KEY') || req.query.apikey || req.body.apikey;

    console.log(apikey)

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
 * @apiSuccess {Array} victims victims which are already tracked
 */
router.get('/victims', (req, res, next) => {
  Victim.all()
    .then(victims => {
        res.json(victims);
    });
});

/**
 * @api {get} /api/victims/{id} Request attributes from specific victim
 * @apiName GetVictim
 * @apiGroup Victims
 *
 * @apiSuccess {Victim} victim single victim which is already tracked
 */
router.get('/victims/:id', (req, res, next) => {
  Victim.findById(req.params.id).then(victim => {
    if(victim == null)
      res.json({error: "not found"});
    else
      res.json(victim);
  });
});

module.exports = router;
