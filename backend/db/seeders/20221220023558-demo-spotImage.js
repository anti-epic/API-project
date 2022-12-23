'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        "spotId": 2,
        "url": "lllllllllll",
        "preview": true

      },
      {
        "spotId": 3,
        "url": "iiiiiiiiiiiiiiii",
        "preview": false

      },
      {
        "spotId": 1,
        "url": "fffffffff",
        "preview": true

      }

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      Id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
