var gameRouter = function(server) {

  var game = require('../controllers/gamesController');
  var V1_0_0 = '1.0.0';

  server.get({path: 'api/games', version: V1_0_0}, game.get);
  server.get({path: 'api/games/:id', version: V1_0_0}, game.getById);
  server.post({path: 'api/games', verstion: V1_0_0}, game.post);

  return server;

};

module.exports = gameRouter;
