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
        "spotId": 1,
        "url": "https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_960_720.jpg",
        "preview": true

      },
      {
        "spotId": 2,
        "url": "https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_960_720.jpg",
        "preview": true

      },
      {
        "spotId": 3,
        "url": "https://cdn.pixabay.com/photo/2016/12/06/14/33/log-cabin-1886620_960_720.jpg",
        "preview": true

      },
      {
        "spotId": 4,
        "url": "https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_960_720.jpg",
        "preview": true

      },
      {
        "spotId": 5,
        "url": "https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_960_720.jpg",
        "preview": true

      },
      {
        "spotId": 6,
        "url": "https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_960_720.jpg",
        "preview": true

      },
      {
        "spotId": 7,
        "url": "https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_960_720.jpg",
        "preview": true

      },
      {
        "spotId": 8,
        "url": "https://www.deviantart.com/chakotay02/art/Tony-Stark-mansion-523515812",
        "preview": true

      },
      {
        "spotId": 9,
        "url": "https://cdn.pixabay.com/photo/2016/12/06/14/33/log-cabin-1886620_960_720.jpg",
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
