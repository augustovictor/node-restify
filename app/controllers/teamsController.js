var models = require('../models/index');

var teamsController = function() {

  var mid = function(req, res, next) {
    return models.Team.find({
        where: {id: req.params.id}
      }).then(team => {
        if (team) {
          req.team = team;
          return next();
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
    mid(req).then(() => {
      if (req.team) {
        res.send(req.team);
      } else {
        res.send(404, 'Team not found');
      }
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

  var put = function(req, res, next) {
    var team = models.Team.find({
      where: {id: req.params.id}
    }).then(team => {
      if (team) {
        team.update({
            name: req.body.name,
            coach: req.body.coach
          }).then(team => {
            res.send(200, team);
          }).catch(err => {
            res.send(500, err);
          });
      } else {
        res.send(404, 'Team not found');
      }
    }).catch(err => {
      res.send(500, err);
    });

    return next();
  };

  var del = function(req, res, next) {
    var team = models.Team.find({
        where: {id: req.params.id}
      }).then(team => {
        if (team) {
          team.destroy({
              where: {
                id: req.params.id
              }
            }).then(team => {
              res.send(204, 'Team removed');
            }).catch(err => {
              res.send(500, err);
            });
        } else {
          res.send(404, 'Team not found');
        }
      }).catch(err => {
        res.send(500, err);
      });
    return next();
  };

  return {
    mid: mid,
    get: get,
    post: post,
    getById: getById,
    put: put,
    del: del
  };
};

module.exports = teamsController();