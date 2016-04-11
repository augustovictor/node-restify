'use strict';
// sequelize db:seed:all
// sequelize db:seed --seed seeders/players.js

// sequelize:db:seed:undo:all
// sequelize db:seed:undo --seed seeders/players.js
module.exports = {
  up: (queryInterface, Sequelize) => {

    var players = [];

    // Teams
    for (var t = 1; t <= 10; t++) {
      // Players
      for (var i = 1; i <= 10; i++) {
        players.push({
          'name':   'Player ' + i + '.' + t,
          'age':    i * Math.floor(Math.random() * 32) + 17,
          'number': i,
          'TeamId': t
        });
      }
    }
    return queryInterface.bulkInsert(
        'players', players,
        {
          schema: 'scorefa'
        }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Players', null, {});
  }
};
