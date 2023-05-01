'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sensors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      node_id: {
        type: Sequelize.STRING
      },
      node_name: {
        type: Sequelize.STRING
      },
      memory_size: {
        type: Sequelize.STRING
      },
      sensor_id: {
        type: Sequelize.STRING
      },
      sensor_name: {
        type: Sequelize.STRING
      },
      sensor_value: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      last_active: {
        type: Sequelize.DATE
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sensors');
  }
};