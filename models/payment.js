"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      Payment.belongsTo(models.User, {
        foreignKey: "employer_id",
        as: "Employer"
      });
      Payment.belongsTo(models.User, {
        foreignKey: "freelancer_id",
        as: "Freelancer"
      });
    }
  }

  Payment.init(
    {
      employer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User", 
          key: "id",
        },
      },
      freelancer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User", 
          key: "id",
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
      },
    },
    {
      sequelize,
      modelName: "Payment",
      timestamps: true,
      underscored: true,
    }
  );

  return Payment;
};
