// authController.js
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

require("dotenv").config();

const db = require("../models/index");
const { User, SupportSchedule } = db;
db.sequelize.sync();


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


    const hashedPassword = await bcrypt.hash(password, 10);

 
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
      res.status(400).json({ error: 'Username is already taken' });
    } else {
      console.error(err);
      res.status(500).send("Server Error ครับ");
    }
  }
};


exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;


    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed: User not found" });
    }

    const jwtSecret = process.env.JWT_SECRET; 


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

  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
