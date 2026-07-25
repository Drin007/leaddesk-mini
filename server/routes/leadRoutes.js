const express = require("express");

const router = express.Router();

const {
  createLead,
  getLeads,
  updateLead,
} = require("../controllers/leadController");

const auth = require("../middleware/authMiddleware");

router.post("/", createLead);

router.get("/", auth, getLeads);
router.patch("/:id", auth, updateLead);

module.exports = router;
