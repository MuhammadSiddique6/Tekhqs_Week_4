const express = require("express")
const router = express.Router();
const forgetpassController = require("../controllers/forgetpassword");
const verifyController = require("../controllers/verficationController");

router.post("/", forgetpassController.forgetotp);
router.post("/forgetpass", forgetpassController.forgetpass);
router.post("/newpassword", forgetpassController.newpassword);
router.post("/resend", verifyController.resend);

module.exports = router;