'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: "Product name is required"
        },
        notEmpty: {
          msg: "Product name is required"
        }
      }
    },
    shopId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull:{
          msg: "Shop Id is required"
        },
        notEmpty: {
          msg: "Shop Id is required"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: "Description is required"
        },
        notEmpty: {
          msg: "Description is required"
        },
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull:{
          msg: "Price is required"
        },
        notEmpty: {
          msg: "Price is required"
        },
        min: 1
      }
    },
    bulkPrice: DataTypes.INTEGER,
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: "Brand is required"
        },
        notEmpty: {
          msg: "Brand is required"
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};