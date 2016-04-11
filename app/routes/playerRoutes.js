var playerRouter = function(server) {

  var player = require('../controllers/playersController');
  var V1_0_0 = '1.0.0';

  server.get({path: 'api/teams/:teamId/players', version: V1_0_0}, player.get);

  return server;

};

module.exports = playerRouter;
