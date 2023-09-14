// authController.js
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

require("dotenv").config();

const db = require("../models/index");
const { User, SupportSchedule } = db;
db.sequelize.sync();

// User registration
exports.register = async (req, res) => {
  try {
    const {
      username,
      password,
      email,
      prefix,
      nickname,
      tel,
      firstname,
      lastname,
    } = req.body;

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record using Sequelize
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      prefix,
      nickname,
      tel,
      firstname,
      lastname,
    });
    res.json({ message: "Registration successful" });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      // Handle unique constraint violation (username is not unique)
      res.status(400).json({ error: 'Username is already taken' });
    } else {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find a user by their username using Sequelize
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed: User not found" });
    }

    const jwtSecret = process.env.JWT_SECRET; // Access the JWT secret from environment variables

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const payload = {
      user: {
        username: user.username,
        role: user.role,
      },
    };

    // Generate Token with a longer expiration time
    const token = jwt.sign(payload, jwtSecret, { expiresIn: "24h" });

    res.json({ token, payload });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
