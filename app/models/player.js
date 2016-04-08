'use strict';
module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define('Player', {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    number: DataTypes.INTEGER,
    teamId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Player.belongsTo(models.Team, {
          onDelete: 'SET NULL',
          foreignKey: {
              allowNull: false
            }
        });
      }
    }
  });
  return Player;
};
