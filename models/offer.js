"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {

    static associate(models) {
      Offer.belongsTo(models.User, { foreignKey: "user_id" });
      Offer.belongsTo(models.Post_job, { foreignKey: "job_id" });
      Offer.hasOne(models.Contract, { foreignKey: "offer_id" });
    }
  }
  Offer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      cover_letter: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bids: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      duration_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      milestone: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      job_id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Post_job", 
          key: "id",
        },
      },
      user_id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User", 
          key: "id",
        },
      },
    },
    {
      sequelize,
    modelName: "Offer",
    tableName: "Offer",       
    freezeTableName: true,     
    timestamps: true,
    underscored: true,
    }
  );
  return Offer;
};
