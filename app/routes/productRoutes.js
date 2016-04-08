var product = require('../controllers/productsController');

var productRouter = function(server) {
  server.get('api/v1/products', product.get);
  server.get('api/v1/products/:id', product.getById);
  server.post('api/v1/products', product.post);
  server.put('api/v1/products/:id', product.put);
  server.del('api/v1/products/:id', product.del);

  return server;
};

module.exports = productRouter;
