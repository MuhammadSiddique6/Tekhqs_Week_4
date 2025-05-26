const express = require("express")
const router = express.Router();
const {offers,getalloffers} = require("../controllers/offerController");
const {verifytoken} = require("../middleware/verifytoken");

router.post("/",verifytoken,offers);
router.get("/alloffers",verifytoken,getalloffers)
module.exports = router;