const express = require("express")
const router = express.Router();
const {offers} = require("../controllers/offerController");
const {verifytoken} = require("../middleware/verifytoken");

router.post("/",verifytoken,offers);

module.exports = router;