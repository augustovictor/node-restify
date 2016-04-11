'use strict';
// sequelize db:seed:all
// sequelize db:seed --seed seeders/teams.js

// sequelize:db:seed:undo:all
// sequelize db:seed:undo --seed seeders/teams.js
module.exports = {
  up: (queryInterface, Sequelize) => {
    var teams = [];
    for (var i = 1; i <= 10; i++) {
      teams.push({
        'name':      'Team ' + i,
        'coach':     'Coach ' + i,
        'createdAt': Date.now(),
        'updatedAt': Date.now()
      });
    }
    return queryInterface.bulkInsert(
        'teams', teams,
        {
          schema: 'scorefa'
        }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Teams', null, {});
  }
};
