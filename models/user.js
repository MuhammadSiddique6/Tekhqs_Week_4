"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Profile_setup, { foreignKey: "user_id" });
      User.hasMany(models.Post_job, { foreignKey: "user_id" });
      User.hasMany(models.Offer, { foreignKey: "user_id" });
      User.hasMany(models.Contract, { as: "EmployerContracts", foreignKey: "employer_id" });
      User.hasMany(models.Contract, { as: "FreelancerContracts", foreignKey: "freelancer_id" });
      User.hasMany(models.Payment, { as: "EmployerPayments", foreignKey: "employer_id" });
      User.hasMany(models.Payment, { as: "FreelancerPayments", foreignKey: "freelancer_id" });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      otp: { 
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      otp_expiry: { 
        type: DataTypes.DATE,
      },
      token: { 
        type: DataTypes.STRING,
        allowNull: true,
      },
      permission:{
        type : DataTypes.BOOLEAN,
        allowNull: false
      },
      verify :{
        type : DataTypes.BOOLEAN,
        allowNull: false
      },
      password_verify:{
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {
       sequelize,
  modelName: 'User',
  tableName: 'User', 
  freezeTableName: true,  
  timestamps: true,
  underscored: true,
    }
  );
  return User;
};
