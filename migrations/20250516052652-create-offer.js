'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Offer', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  cover_letter: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  bids: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  duration_time: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  milestone: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  job_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Post_job',
      key: 'id',
    },
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id',
    },
  },
  created_at: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updated_at: {
    allowNull: false,
    type: Sequelize.DATE,
  },
});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Offer');
  }
};
