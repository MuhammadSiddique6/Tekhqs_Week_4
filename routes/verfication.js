const express = require("express")
const router = express.Router();
const verifyController = require("../controllers/verficationController");

router.post("/", verifyController.verification);
router.post("/resend", verifyController.resend);

module.exports =router;