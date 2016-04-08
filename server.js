var restify = require('restify');
var port = process.env.PORT || 3000;

var db = require('./app/config/db/dbConfig')();

var server = restify.createServer({
  name: 'restifyServer'
});

server.use(function(req, res, next) {
  console.log(req.method + ' ' + req.url);
  return next();
});

server.use(restify.bodyParser());

var teamRouter = require('./app/routes/teamRoutes')(server);

server.listen(3000, function() {
  console.log('api running at' + port);
});
