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
        ownerId: "2",
        address: "10880 Malibu Point",
        city: "Malibu",
        state: "CA",
        country: "USA",
        lat: 34.037740,
        lng: -118.711670,
        name: "The Stark Mansion",
        description:"The Stark Mansion, also known as Tony Stark's Malibu Mansion, or simply the Malibu Mansion, is an advanced and modernized mansion created and owned by Tony Stark.",
        price: 500
      },
      {
        ownerId: "1",
        address: "1600 Pennsylvania Avenue NW",
        city: "D.C.",
        state: "WA",
        country: "USA",
        lat: 38.898819,
        lng: -77.036690,
        name: "The White House",
        description:"The White House is the official residence and workplace of the president of the United States. It is located at 1600 Pennsylvania Avenue NW in Washington, D.C., and has been the residence of every U.S. president since John Adams in 1800.",
        price: 1000
      },
      {
        ownerId: "3",
        address: "20 Ingram St.",
        city: "New York City",
        state: "NY",
        country: "USA",
        lat: 40.712970,
        lng: -73.843210,
        name: "The SpiderMan Hangout Crib",
        description:"Peter Parker's residence is 20 Ingram St. in Queens, a fake address in Forest Hills, but numerous places get the protection of Spider-Man in New York City.",
        price: 200
      },
      {
        ownerId: "2",
        address: "10880 Malibu Point",
        city: "Malibu",
        state: "CA",
        country: "USA",
        lat: 34.037740,
        lng: -118.711670,
        name: "The Stark Mansion",
        description:"The Stark Mansion, also known as Tony Stark's Malibu Mansion, or simply the Malibu Mansion, is an advanced and modernized mansion created and owned by Tony Stark.",
        price: 500
      },
      {
        ownerId: "1",
        address: "1600 Pennsylvania Avenue NW",
        city: "D.C.",
        state: "WA",
        country: "USA",
        lat: 38.898819,
        lng: -77.036690,
        name: "The White House",
        description:"The White House is the official residence and workplace of the president of the United States. It is located at 1600 Pennsylvania Avenue NW in Washington, D.C., and has been the residence of every U.S. president since John Adams in 1800.",
        price: 1000
      },
      {
        ownerId: "3",
        address: "20 Ingram St.",
        city: "New York City",
        state: "NY",
        country: "USA",
        lat: 40.712970,
        lng: -73.843210,
        name: "The SpiderMan Hangout Crib",
        description:"Peter Parker's residence is 20 Ingram St. in Queens, a fake address in Forest Hills, but numerous places get the protection of Spider-Man in New York City.",
        price: 200
      },
      {
        ownerId: "2",
        address: "10880 Malibu Point",
        city: "Malibu",
        state: "CA",
        country: "USA",
        lat: 34.037740,
        lng: -118.711670,
        name: "The Stark Mansion",
        description:"The Stark Mansion, also known as Tony Stark's Malibu Mansion, or simply the Malibu Mansion, is an advanced and modernized mansion created and owned by Tony Stark.",
        price: 500
      },
      {
        ownerId: "1",
        address: "1600 Pennsylvania Avenue NW",
        city: "D.C.",
        state: "WA",
        country: "USA",
        lat: 38.898819,
        lng: -77.036690,
        name: "The White House",
        description:"The White House is the official residence and workplace of the president of the United States. It is located at 1600 Pennsylvania Avenue NW in Washington, D.C., and has been the residence of every U.S. president since John Adams in 1800.",
        price: 1000
      },
      {
        ownerId: "3",
        address: "20 Ingram St.",
        city: "New York City",
        state: "NY",
        country: "USA",
        lat: 40.712970,
        lng: -73.843210,
        name: "The SpiderMan Hangout Crib",
        description:"Peter Parker's residence is 20 Ingram St. in Queens, a fake address in Forest Hills, but numerous places get the protection of Spider-Man in New York City.",
        price: 200
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
