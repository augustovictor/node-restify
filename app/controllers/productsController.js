var productsController = function() {
  var that = this;
  that.store = [];

  var findProductById = function(req) {
    var found = that.store.filter(function(p) {
      return p.id === parseInt(req.params.id);
    });

    if (found && found.length > 0) {
      return found[0];
    }
    return null;
  };

  var get = function(req, res, next) {
    res.send(200, that.store);
    return next();
  };

  var getById = function(req, res, next) {
    var product = findProductById(req);
    if (product) {
      res.send(200, product);
    } else {
      res.send(404, 'Product not found');
    }
    return next();
  };

  var post = function(req, res, next) {
    if (!req.body.hasOwnProperty('id') || !req.body.hasOwnProperty('name')) {
      res.send(500);
    } else {
      that.store.push({
        id: parseInt(req.body.id),
        name: req.body.name
      });
      res.send(201);
    }
    return next();
  };

  var put = function(req, res, next) {
    if (!req.body.hasOwnProperty('name')) {
      res.send(500);
      return next();
    }
    var product = findProductById(req);
    if (product) {
      product.name = req.body.name;
      res.send(200, product);
    } else {
      res.send(404, 'Product not found');
    }
    return next();
  };

  var del = function(req, res, next) {
    that.store = that.store.filter(function(p) {
      return p.id !== parseInt(req.params.id);
    });
    res.send(200);
    return next();
  };

  return {
    get: get,
    post: post,
    getById: getById,
    put: put,
    del: del
  };
};

module.exports = productsController();
