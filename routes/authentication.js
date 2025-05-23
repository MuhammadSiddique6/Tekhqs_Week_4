const express = require("express")
const router = express.Router();
const auth = require("../controllers/authController");

router.post("/",auth.signup);
router.post("/signin",auth.signin);
router.post("/logout",auth.logout);
router.delete("/deleteuser",auth.deleteUser);

module.exports = router;