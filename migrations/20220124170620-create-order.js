'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderList: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.TEXT)
      },
      customerName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      orderDestionation:{
        allowNull: false,
        type: Sequelize.STRING,
      },
      customerPhoneNumber:{
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      totalPrice: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      shopId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Shops', key: 'id' },
        onUpdate: `CASCADE`,
        onDelete: `SET NULL`,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};