var playerRouter = function(server) {

  var player = require('../controllers/playersController');
  var V1_0_0 = '1.0.0';

  server.get({path: 'api/teams/:teamId/players', version: V1_0_0}, player.get);
  server.get({path: 'api/teams/:teamId/players/:id', version: V1_0_0}, player.getById);
  server.post({path: 'api/teams/:teamId/players', verstion: V1_0_0}, player.post);
  server.put({path: 'api/teams/:teamId/players/:id', version: V1_0_0}, player.put);

  return server;

};

module.exports = playerRouter;
