var models = require('../models/index');

var teamsController = function() {

  var mid = function(req, res, next) {
    return models.Team.find({
      where: {id: req.params.id}
    }).then(result => {
      if (result) {
        return result;
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
    mid(req).then(result => {
      if (result) {
        res.send(result);
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
    mid(req).then(result => {
      if (result) {
        result.update({
          name: req.body.name,
          coach: req.body.coach
        }).then(result => {
          res.send(200, result);
        }).catch(err => {
          res.send(err);
        });
      } else {
        res.send(404, 'Team not found');
      }
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
    get: get,
    post: post,
    getById: getById,
    put: put,
    del: del
  };
};

module.exports = teamsController();
