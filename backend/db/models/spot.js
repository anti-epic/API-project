'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.hasMany(models.Review, {
        onDelete: 'CASCADE',
        hooks: true,
        foreignKey: 'spotId'
      });
      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId',
      });


     Spot.hasMany(models.SpotImage, {

      onDelete: 'CASCADE',
      hooks: true,
      foreignKey: 'spotId'
    });
    Spot.hasMany(models.Booking, {
      onDelete: 'CASCADE',
      hooks: true,
      foreignKey: 'spotId'
    });
    }
  }
  Spot.init({
    ownerId: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    address: {
      type:DataTypes.STRING,
      allowNull:false
    },
    city: {
      type:DataTypes.STRING,
      allowNull:false
    },
    state: {
      type:DataTypes.STRING,
      allowNull:false
    },
    country: {
      type:DataTypes.STRING,
      allowNull:false
    },
    lat: {
      type:DataTypes.FLOAT,
      allowNull:true
    },
    lng: {
      type:DataTypes.FLOAT,
      allowNull:true
    },
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    description: {
      type:DataTypes.TEXT,
      allowNull:false
    },
    price: {
      type:DataTypes.FLOAT,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
