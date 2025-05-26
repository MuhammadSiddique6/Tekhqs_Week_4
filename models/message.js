"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Message.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
          primaryKey: true,
        autoIncrement: true,
      },
      sender_id: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      receiver_id: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
     sequelize,
      modelName: "Message",
       tableName: "Message",       
    freezeTableName: true,     
    timestamps: true,
    }
  );
  return Message;
};
