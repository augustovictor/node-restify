var models = require('../models/index');

var playersController = function() {

  var get = function(req, res, next) {
    var query = {};
    if (req.query.name) {
      query.name = req.query.name;
    }

    models.Player.findAll({
      where: {
        teamId: req.params.teamId
      }
    }).then(data => {
      if (data) {
        res.send(200, data);
      } else {
        res.send(404, 'Players not found');
      }
    }).catch(err => {
      res.send(500, err);
    });

    return next();
  };

  return {
    get: get
  };
};

module.exports = playersController();
