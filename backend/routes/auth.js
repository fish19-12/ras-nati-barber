// REGISTER ADMIN
router.post("/register", async (req, res) => {
  const { username, password, adminKey } = req.body;

  try {
    // SECRET ADMIN KEY
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({
        message: "Unauthorized admin creation",
      });
    }

    const exists = await User.findOne({ username });

    if (exists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const newUser = new User({
      username,
      password,
      role: "admin",
    });

    await newUser.save();

    res.status(201).json({
      message: "Admin created successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});
