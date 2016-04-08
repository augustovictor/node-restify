var models = require('../models/index');

var teamsController = function() {

  // var findProductById = function(req) {
  //   var found = that.store.filter(function(p) {
  //     return p.id === parseInt(req.params.id);
  //   });
  //
  //   if (found && found.length > 0) {
  //     return found[0];
  //   }
  //   return null;
  // };

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

  // var getById = function(req, res, next) {
  //   var team = findProductById(req);
  //   if (team) {
  //     res.send(200, team);
  //   } else {
  //     res.send(404, 'Product not found');
  //   }
  //   return next();
  // };

  // var post = function(req, res, next) {
  //   if (!req.body.hasOwnProperty('id') || !req.body.hasOwnProperty('name')) {
  //     res.send(500);
  //   } else {
  //     that.store.push({
  //       id: parseInt(req.body.id),
  //       name: req.body.name
  //     });
  //     res.send(201);
  //   }
  //   return next();
  // };

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
    get: get
    // post: post,
    // getById: getById,
    // put: put,
    // del: del
  };
};

module.exports = teamsController();
