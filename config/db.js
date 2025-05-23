//const { Client } = require("pg")
const { Sequelize } = require("sequelize");
require("dotenv").config();


const sequelize = new Sequelize("MSK", "postgres", process.env.DB_PASSWORD, {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  logging: false, 
}); 

/*
const  client = new Client({
    host:"localhost",
    user:"postgres",
    port:5432,
    password:process.env.DB_PASSWORD,
    database:"MSK",
});

pool.connect().then(()=>{
    console.log("database connected")

}).catch((err)=>{
    console.log("database connection error:",err)
});
*/

const connection = async ()=>{
    try{
        await sequelize.authenticate();
        console.log("Database Connected")
    }
    catch(err)
    {
        console.log(`Database not connected the error is : ${err}`);
    }
}
module.exports = {sequelize,connection};