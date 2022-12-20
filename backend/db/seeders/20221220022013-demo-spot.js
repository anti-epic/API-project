'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {

    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: "1",
        address: "26226 cross hollow lane",
        city: "cypress",
        state: "TX",
        country: "USA",
        lat: 1233.21,
        lng: 123213.22,
        name: "party",
        description:"an event",
        price: 10000
      },
      {
        ownerId: "2",
        address: "36336 lane",
        city: "houston",
        state: "TX",
        country: "USA",
        lat: 5555.21,
        lng: 5521.22,
        name: "not party",
        description:"not a event",
        price: 20000
      },
      {
        ownerId: "3",
        address: "36336 cross",
        city: "katy",
        state: "TX",
        country: "USA",
        lat: 6666.21,
        lng: 7777.22,
        name: "event",
        description:"a event",
        price: 30000
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
