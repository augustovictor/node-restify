'use strict';
module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define('Game', {
    teamH: DataTypes.INTEGER,
    teamV: DataTypes.INTEGER,
    gameDate: DataTypes.DATE,
    ticketPrice: DataTypes.DECIMAL,
    place: DataTypes.STRING,
    placeLink: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        Game.belongsTo(models.Team, {
          foreignKey: 'teamH'
        }),
        Game.belongsTo(models.Team, {
          foreignKey: 'teamV'
        });
      }
    }
  });
  return Game;
};
