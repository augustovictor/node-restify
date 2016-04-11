var models = require('../models/index');

var playersController = function() {

  var mid = function(req) {
    return models.Player.find({
      where: {
        id: req.params.id,
        TeamId: req.params.teamId
      }
    }).then(result => {
      return result;
    });
  };

  var get = function(req, res, next) {
    var query = {};
    if (req.query.name) {
      query.name = req.query.name;
    }

    models.Player.findAll({
      where: {
        teamId: req.params.teamId
      }
    }).then(data => {
      if (data) {
        res.send(200, data);
      } else {
        res.send(404, 'Players not found');
      }
    }).catch(err => {
      res.send(500, err);
    });

    return next();
  };

  var post = function(req, res, next) {
    var player = req.body;
    if (!req.body.hasOwnProperty('name')) {
      res.send(400, 'Attribute name is required');
    } else {
      models.Player.create({
        name: player.name,
        age: player.age,
        number: player.number,
        TeamId: req.params.teamId
      }).then(player => {
        res.send(200, player);
      }).catch(err => {
        res.send(500, err);
      });
    }
    return next();
  };

  var getById = function(req, res, next) {
    mid(req, res).then(result => {
      if (result) {
        res.send(200, result);
      } else {
        res.send(404, 'Player not found');
      }
    }).catch(err => {
      res.send(500, err);
    });
    return next();
  };

  return {
    get: get,
    post: post,
    getById: getById
  };
};

module.exports = playersController();
