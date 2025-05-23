const express = require("express")
const router = express.Router();
const {contract} = require("../controllers/contractController");
const {verifytoken} = require("../middleware/verifytoken");


router.post("/",verifytoken,contract);

module.exports = router;