'use strict';
// sequelize db:seed:all
// sequelize db:seed --seed seeders/games.js

// sequelize:db:seed:undo:all
// sequelize db:seed:undo --seed seeders/games.js
module.exports = {
  up: (queryInterface, Sequelize) => {

    var games = [];
    var date = new Date;

    date =  new Date(
        date.getFullYear() +
        '-' +
        date.getMonth() +
        '-' +
        date.getDate() +
        ' ' +
        date.getHours() +
        ':' +
        date.getMinutes() +
        ':00'
    );

    // Games
    for (var i = 1; i <= 10; i++) {
      games.push({
        teamH: 1,
        teamV: Math.floor(Math.random() * 9) + 2,
        gameDate: date,
        place: 'National league state',
        placeLink: 'https://www.google.com.br/maps',
        createdAt: date,
        updatedAt: date
      });
    }
    return queryInterface.bulkInsert(
        'games', games,
        {
          schema: 'scorefa'
        }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Games', null, {});
  }
};
