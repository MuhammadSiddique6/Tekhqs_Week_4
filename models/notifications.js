'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Notifications.init({
    message_id: {
      type: DataTypes.INTEGER,
      allowNull:true,
      
    },
    offer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    job_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Notifications',
    tableName: "Notifications",       
    freezeTableName: true,     
    timestamps: true,
  });
  return Notifications;
};