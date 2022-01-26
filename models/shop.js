'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Shop.belongsTo(models.User,{foreignKey:"userId"})
      // define association here
    }
  };
  Shop.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      unique: {
        msg: "Entered Shop name has been taken, please enter another name"
      },
      validate: {
        notNull: {
          msg : "Shop name is required"
        },
        notEmpty:{
          msg : "Shop name is required"
        },
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    imageUrl: DataTypes.STRING,
    motto: DataTypes.STRING,
    address: DataTypes.STRING,
    category: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg : "Category is required"
        },
        notEmpty:{
          msg : "Category is required"
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Shop',
  });
  return Shop;
};