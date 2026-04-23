const express = require("express");
const router = express.Router();

const {
  createRegister,
  getRegisters,
  deleteRegister,
} = require("../controllers/registerController");

// CREATE
router.post("/", createRegister);

// GET ALL
router.get("/", getRegisters);

// DELETE
router.delete("/:id", deleteRegister);

module.exports = router;
