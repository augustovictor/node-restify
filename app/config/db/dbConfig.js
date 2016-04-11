var Sequelize = require('sequelize');
var dbConfig = require('../config.json').development;
var connection = new Sequelize(
    dbConfig.database, dbConfig.username, dbConfig.password
);

module.exports = () => {

  var models = require('../../models/index');

  models.sequelize.sync({
      force: true,
      logging: console.log
    }).then(function() {
      console.log('Db OK');
    }).catch(function(err) {
      console.error(err);
    });

};
