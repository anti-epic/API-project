'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {

    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        "spotId": 3,
        "userId": 2,
        "startDate": "2022-01-17T04:33:12.000Z",
        "endDate": "2022-01-19T04:33:12.000Z"
      },
      {
        "spotId": 2,
        "userId": 1,
        "startDate": "2022-01-17T04:33:12.000Z",
        "endDate": "2022-01-19T04:33:12.000Z"
      },
      {
        "spotId": 1,
        "userId": 3,
        "startDate": "2022-01-17T04:33:12.000Z",
        "endDate": "2022-01-19T04:33:12.000Z"
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      Id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
