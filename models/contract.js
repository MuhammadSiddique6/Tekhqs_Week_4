"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contract extends Model {
    static associate(models) {
      Contract.belongsTo(models.User, {
        as: "Employer",
        foreignKey: "employer_id",
      });
      Contract.belongsTo(models.User, {
        as: "Freelancer",
        foreignKey: "freelancer_id",
      });
      Contract.belongsTo(models.Post_job, { foreignKey: "job_id" });
    }
  }
  Contract.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.INTEGER,
        allowNull: false,
       
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      
      },

      offer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
       
      },
       job_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
       
      },
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
    },
    {
      sequelize,
      modelName: "Contract",
       tableName: "Contract",       
    freezeTableName: true,     
    timestamps: true,
    underscored: true,
    }
  );
  return Contract;
};
