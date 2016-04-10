var teamRouter = function(server) {

  var team = require('../controllers/teamsController');
  var V1_0_0 = '1.0.0';

  server.get({path: 'api/teams', version: V1_0_0}, team.get);
  server.get({path: 'api/teams/:id', version: V1_0_0}, team.getById);
  server.post({path: 'api/teams', verstion: V1_0_0}, team.post);
  server.put({path: 'api/teams/:id', version: V1_0_0}, team.put);
  server.del({path: 'api/teams/:id', version: V1_0_0}, team.del);

  return server;
};

module.exports = teamRouter;
