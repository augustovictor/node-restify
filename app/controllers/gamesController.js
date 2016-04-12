var models = require('../models/index');
var middleware = require('../middlewares/generics');

var gamesController = function() {

  var Game = models.Game;

  var get = function(req, res, next) {
    models.Game.findAll({}).then(result => {
      if (result) {
        res.send(200, result);
      } else {
        res.send(404, 'Games not foud');
      }
    }).catch(err => {
      res.send(500, err);
    });
    return next();
  };
  return {
    get: get
  };
};

module.exports = gamesController();
