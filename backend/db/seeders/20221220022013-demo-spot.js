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
        name: "The Old Corner Shop",
        description:"The Old Corner Shop is a unique and charming property and was once an old corner shop, but has been lovingly restored and renovated to offer all the modern amenities while still retaining its historic charm.",   price: 500
      },
      {
        ownerId: "2",
        address: "1600 Pennsylvania Avenue NW",
        city: "D.C.",
        state: "WA",
        country: "USA",
        lat: 38.898819,
        lng: -77.036690,
        name: "The Ivies",
        description:"Welcome to our beautiful and stylish house, located in a serene and peaceful location, surrounded by nature's lush greenery. This charming and cozy home has everything you need for a comfortable and relaxing stay.",  price: 1000
      },
      {
        ownerId: "3",
        address: "20 Ingram St.",
        city: "Honolulu",
        state: "HI",
        country: "USA",
        lat: 40.712970,
        lng: -73.843210,
        name: "Zlatan's House",
        description:`Welcome to our stunning beachfront villa, located on the beautiful coast of Hawaii. This luxurious property is the perfect vacation home for those seeking a private and peaceful retreat with breathtaking ocean views.`,
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
        name: "Ashley Lodge",
        description:`Welcome to your dream vacation home, where you can experience the ultimate luxury retreat in the heart of nature. This stunning property is nestled in a tranquil setting surrounded by breathtaking scenery that is sure to take your breath away.`,
        price: 500
      },
      {
        ownerId: "3",
        address: "1600 Pennsylvania Avenue NW",
        city: "D.C.",
        state: "WA",
        country: "USA",
        lat: 38.898819,
        lng: -77.036690,
        name: "Rose End",
        description:`A  perfect getaway for those looking to escape the hustle and bustle of city life. This beautifully designed house is located in the heart of the Joshua Tree National Park area, surrounded by breathtaking natural beauty and unique desert landscape.`,
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
        name: "Sea View",
        description:`Welcome to our beautiful and modern beachfront villa, located in the heart of Santa Barbara, California. This stunning property is the perfect retreat for those looking for a luxurious getaway with breathtaking views of the ocean.`,
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
        name: "South House",
        description:`This stunning villa boasts five bedrooms, each with its own private en-suite bathroom, making it perfect for larger families or groups of friends.`,
        price: 500
      },
      {
        ownerId: "3",
        address: "1600 Pennsylvania Avenue NW",
        city: "D.C.",
        state: "WA",
        country: "USA",
        lat: 38.898819,
        lng: -77.036690,
        name: "Seaways",
        description:`Welcome to our stunning beachfront house, located on the picturesque coast of California. This beautiful property offers panoramic ocean views and direct access to the beach, making it the perfect destination for your next getaway.`,
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
        name: "Roselands",
        description:`Welcome to our beautiful coastal home, located in the picturesque town of Cannon Beach, Oregon. This stunning property boasts a prime location just steps away from the sandy beach, offering breathtaking ocean views and easy access to all the seaside fun.`,
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
