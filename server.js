const express = require("express");
const app = express();
const {connection} =  require("./config/db");
require("dotenv").config();

connection();
const PORT = process.env.PORT || 5000

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use("/api/auth",require("./routes/authentication"));
app.use("/api/forgetpassword",require("./routes//forgetpassword"));
app.use("/api/profile",require("./routes/proflie"));
app.use("/api/verify",require("./routes/verfication"));
app.use("/api/postjob",require("./routes/postjob"));
app.use("/api/offer",require("./routes/offer"));
app.use("/api/contract", require("./routes/contract"));
app.listen(PORT,()=>
{
    console.log(`http://localhost:${PORT}`)
});