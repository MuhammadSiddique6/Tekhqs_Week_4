'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post_job extends Model {

    static associate(models) {
      Post_job.belongsTo(models.User, { foreignKey: "user_id" });
      Post_job.hasMany(models.Offer, { foreignKey: "job_id" });
      Post_job.hasOne(models.Contract, { foreignKey: "job_id" });    
    }
  }
  Post_job.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    title: {
      type: DataTypes.STRING,
      allowNull:  false,
    },
    bids:{
      type : DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User", 
          key: "id",
        },
    }
    }, {
    sequelize,
    modelName: 'Post_job',
    tableName: 'Post_job', // 👈 Tell Sequelize to use exact table name
    freezeTableName: true, // 👈 Prevent Sequelize from pluralizing
    underscored: true, 
  });
  return Post_job;
};