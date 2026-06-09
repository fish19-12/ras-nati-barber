const UnavailableSlot = require("../models/UnavailableSlot");

// CREATE UNAVAILABLE SLOT
exports.createUnavailableSlot = async (req, res) => {
  try {
    const bookingDate = new Date(req.body.date);

    // normalize date
    bookingDate.setHours(0, 0, 0, 0);

    const slot = await UnavailableSlot.create({
      date: bookingDate,
      time: req.body.time,
      reason: req.body.reason || "",
    });

    res.status(201).json({
      success: true,
      message: "Time slot blocked successfully",
      slot,
    });
  } catch (error) {
    console.error("Create unavailable slot error:", error.message);

    // Duplicate slot
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "This time slot is already blocked.",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL BLOCKED SLOTS
exports.getUnavailableSlots = async (req, res) => {
  try {
    const slots = await UnavailableSlot.find().sort({
      date: 1,
    });

    res.status(200).json(slots);
  } catch (error) {
    console.error("Get unavailable slots error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE BLOCKED SLOT
exports.deleteUnavailableSlot = async (req, res) => {
  try {
    const { id } = req.params;

    await UnavailableSlot.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Blocked slot removed successfully",
    });
  } catch (error) {
    console.error("Delete unavailable slot error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
