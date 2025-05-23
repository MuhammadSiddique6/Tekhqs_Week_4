const express = require("express")
const router = express.Router();
const upload = require("../middleware/multer")
const ProfileController = require("../controllers/profileController")
const { verifytoken } = require("../middleware/verifytoken");

router.post("/",verifytoken,upload.single("image"),ProfileController.profile);

module.exports = router; 