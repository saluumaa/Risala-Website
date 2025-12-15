import bcryptjs from "bcryptjs";
import User from "../models/User.js";
import sequelize from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

(async () => {
  try {

    // 🔒 BLOCK script in production (safety switch)
    if (process.env.NODE_ENV === "production") {
      console.log("Admin creation disabled in production");
      process.exit(0);
    }

    await sequelize.authenticate();

    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      throw new Error("Missing admin credentials in env");
    }

    const existingAdmin = await User.findOne({
      where: { email: process.env.ADMIN_EMAIL },
    });

    if (existingAdmin) {
      console.log("⚠️ Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcryptjs.hash(
      process.env.ADMIN_PASSWORD,
      10
    );

    await User.create({
      username: "Risala Admin",
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin created successfully");
    process.exit(0);

  } catch (error) {
    console.error("❌ Failed to create admin:", error.message);
    process.exit(1);
  }
})();
