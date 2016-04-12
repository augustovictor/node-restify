var models = require('../models/index');

var gamesController = function() {

  var Game = models.Game;

  var mid = function(req) {
    return Game.find({
      where: {
        id: req.params.id
      },
      include: [
          {
            model: models.Team, as: 'teamHome',
            include: [models.Player]
          },
          {
            model: models.Team, as: 'teamVisitor',
            include: [models.Player]
          }
      ]
    }).then(result => {
      return result;
    }).catch(err => {
      return err;
    });
  };

  var get = function(req, res, next) {
    Game.findAll({}).then(result => {
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
      Game.create({
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

  var getById = function(req, res, next) {
    mid(req).then(result => {
      if (result) {
        res.send(200, result);
      } else {
        res.send(400, 'Games not found');
      }
    }).catch(err => {
      res.send(500, err);
    });
    return next();
  };

  var put = function(req, res, next) {
    var game = req.body;
    if (game.hasOwnProperty('teamH') || game.hasOwnProperty('teamV')) {
      res.send(400, 'Attributes not allowed');
    } else {
      mid(req).then(result => {
        if (result) {
          result.update({
            gameDate: game.gameDate || result.gameDate,
            ticketPrice: game.ticketPrice || result.ticketPrice,
            place: game.place || result.place,
            placeLink: game.placeLink || result.placeLink
          }).then(result => {
            res.send(200, result);
          }).catch(err => {
            res.send(500, err);
          });
        } else {
          res.send(404, 'Games not found');
        }
      }).catch(err => {
        res.send(500, err);
      });
    }
    return next();
  };

  var del = function(req, res, done) {
    mid(req).then(result => {
      if (result) {
        result.destroy({
          where: {id: req.params.id}
        }).then(result => {
          res.send(204, 'Game removed');
        }).catch(err => {
          res.send(500, err);
        });
      } else {
        res.send(404, 'Games not found');
      }
    }).catch(err => {
      res.send(500, err);
    });
    return done();
  };

  return {
    get: get,
    post: post,
    getById: getById,
    put: put,
    del: del
  };
};

module.exports = gamesController();
