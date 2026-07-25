const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "admin@gmail.com").toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

mongoose.connect(process.env.MONGO_URI);

async function createAdmin() {
  try {
    const existingUser = await User.findOne({ email: ADMIN_EMAIL });

    if (existingUser) {
      console.log("Admin already exists.");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    await User.create({
      name: "Admin",
      email: ADMIN_EMAIL,
      password: hashedPassword,
    });

    console.log(`Admin created successfully: ${ADMIN_EMAIL}`);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

createAdmin();
