'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      teamH: {
        type: Sequelize.INTEGER
      },
      teamV: {
        type: Sequelize.INTEGER
      },
      gameDate: {
        type: Sequelize.DATE
      },
      ticketPrice: {
        type: Sequelize.DECIMAL
      },
      place: {
        type: Sequelize.STRING
      },
      placeLink: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Games');
  }
};