const express = require("express");
const router = express.Router();
const { post } = require("../controllers/postjobController");
const { verifytoken } = require("../middleware/verifytoken");

router.post("/",verifytoken, post);

module.exports = router;
