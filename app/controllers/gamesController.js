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

  var post = function(req, res, next) {
    var game = req.body;
    if (
        !game.hasOwnProperty('teamH') ||
        !game.hasOwnProperty('teamV') ||
        !game.hasOwnProperty('gameDate') ||
        !game.hasOwnProperty('place')
    ) {
      res.send(400, 'teamHome, teamVisitor, gameDate and place are required');
    } else {
      models.Game.create({
        teamH: game.teamH,
        teamV: game.teamV,
        gameDate: game.gameDate,
        place: game.place,
        ticketPrice: game.ticketPrice,
        placeLink: game.placeLink
      }).then(result => {
        res.send(201, result);
      }).catch(err => {
        res.send(500, err);
      });

    }
    return next();
  };

  return {
    get: get,
    post: post
  };
};

module.exports = gamesController();
