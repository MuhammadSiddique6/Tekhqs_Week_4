const express = require("express");
const router = express.Router();
const {
  contract,
  getcontracts,
  halfmilestone,
  fullmilestone
} = require("../controllers/contractController");
const { verifytoken } = require("../middleware/verifytoken");

router.post("/", verifytoken, contract);
router.get("/allcontracts", verifytoken, getcontracts);
router.put("/milestone/half", verifytoken, halfmilestone);
router.put("/milestone/full", verifytoken, fullmilestone);

module.exports = router;
