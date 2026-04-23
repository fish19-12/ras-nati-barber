const Register = require("../models/Register");

// CREATE REGISTRATION
exports.createRegister = async (req, res) => {
  try {
    const { name, phone, address, age, experience, message } = req.body;

    if (!name || !phone || !address || !age || !experience) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    const newRegister = new Register({
      name,
      phone,
      address,
      age,
      experience,
      message,
    });

    const saved = await newRegister.save();

    res.status(201).json({
      message: "Student registered successfully",
      data: saved,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET ALL REGISTRATIONS (ADMIN)
exports.getRegisters = async (req, res) => {
  try {
    const registers = await Register.find().sort({ createdAt: -1 });

    res.status(200).json(registers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
};

// DELETE REGISTRATION
exports.deleteRegister = async (req, res) => {
  try {
    await Register.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Registration deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};
