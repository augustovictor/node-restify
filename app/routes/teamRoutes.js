var teamRouter = function(server) {

  var team = require('../controllers/teamsController');

  server.get('api/v1/teams', team.get);
  server.get('api/v1/teams/:id', team.getById);
  server.post('api/v1/teams', team.post);
  // server.put('api/v1/teams/:id', team.put);
  // server.del('api/v1/teams/:id', team.del);

  return server;
};

module.exports = teamRouter;
