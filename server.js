var restify = require('restify');
var product = require('./product');
var port = process.env.PORT || 3000;

var server = restify.createServer({
  name: 'restifyServer'
});

server.use(function(req, res, next) {
  console.log(req.method + ' ' + req.url);
  return next();
});

server.use(restify.bodyParser());

server.get('api/v1/products', product.get);
server.get('api/v1/products/:id', product.getById);
server.post('api/v1/products', product.post);
server.put('api/v1/products/:id', product.put);
server.del('api/v1/products/:id', product.del);

server.listen(3000, function() {
  console.log('api running at' + port);
});
