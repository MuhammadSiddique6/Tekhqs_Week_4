"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile_setup extends Model {

    static associate(models) {
      Profile_setup.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Profile_setup.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      profile_img:{
        type: DataTypes.STRING,
        allowNull: true  
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      skill: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      experience: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      company_name:{
        type: DataTypes.STRING,
        allowNull:true
      },
      reviews: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      user_id: {
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
  modelName: "Profile_setup",
  tableName: "Profile_setup",   // ✅ Add this
  freezeTableName: true,        // ✅ Add this
  timestamps: true,
  underscored: true,
    }
  );
  return Profile_setup;
};
