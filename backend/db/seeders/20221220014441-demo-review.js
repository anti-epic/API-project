'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        "spotId": 1,
        "userId": 2,
        "review": "1good place",
        "stars": 5
      },
      {
        "spotId": 3,
        "userId": 3,
        "review": "2good place",
        "stars": 2
      },
      {
        "spotId": 3,
        "userId": 2,
        "review": "3good place",
        "stars": 5
      }

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
