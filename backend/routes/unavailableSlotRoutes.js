const express = require("express");

const router = express.Router();

const {
  createUnavailableSlot,
  getUnavailableSlots,
  deleteUnavailableSlot,
} = require("../controllers/unavailableSlotController");

// Block a time slot
router.post("/", createUnavailableSlot);

// Get all blocked slots
router.get("/", getUnavailableSlots);

// Remove blocked slot
router.delete("/:id", deleteUnavailableSlot);

module.exports = router;
