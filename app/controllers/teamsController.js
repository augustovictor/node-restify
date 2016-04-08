var models = require('../models/index');

var teamsController = function() {

  var mid = function(req) {
    models.Team.find({where: {id: req.params.id}}).then(team => {
      if (team) {
        return team;
      } else {
        return null;
      }
    }).catch(err => {
      return err;
    });

  };

  var get = function(req, res, next) {
    var query = {};
    if (req.query.name) {
      query.name = req.query.name;
    }

    models.Team.findAll({query})
        .then(teams => {
          res.send(200, teams);
          return next();
        }).catch(err => {
          res.send(500, err);
        });
  };

  var getById = function(req, res, next) {
    models.Team.find({where: {id: req.params.id}}).then(team => {
      if (team) {
        res.send(team);
      } else {
        res.send(404, 'Team not found');
      }
    }).catch(err => {
      res.send(500, err);
    });
    return next();
  };

  var post = function(req, res, next) {
    if (!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('coach')) {
      res.send(400, 'Name and coach are required');
    } else {
      models.Team.create({
        name: req.body.name,
        coach: req.body.coach
      }).then(team => {
        res.send(201, team);
      }).catch(err => {
        res.send(500, err);
      });
    }
    return next();
  };

  // var put = function(req, res, next) {
  //   if (!req.body.hasOwnProperty('name')) {
  //     res.send(500);
  //     return next();
  //   }
  //   var team = findProductById(req);
  //   if (team) {
  //     team.name = req.body.name;
  //     res.send(200, team);
  //   } else {
  //     res.send(404, 'Product not found');
  //   }
  //   return next();
  // };

  // var del = function(req, res, next) {
  //   that.store = that.store.filter(function(p) {
  //     return p.id !== parseInt(req.params.id);
  //   });
  //   res.send(200);
  //   return next();
  // };

  return {
    mid: mid,
    get: get,
    post: post,
    getById: getById
    // put: put,
    // del: del
  };
};

module.exports = teamsController();
