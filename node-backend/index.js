const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { readdirSync } = require('fs')



const app = express();

app.use(bodyParser.json());

// MySQL database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "support_schedule",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL");
  }
});



// Routes for registration and login
// User registration route
app.post("/register", async (req, res) => {
  const { username, password, email, prefix, nickname, name, lastname } =
    req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user into the database
  db.query(
    "INSERT INTO users (username, password,email,prefix,nickname,name,lastname) VALUES (?, ?,?, ?,?, ?,?)",
    [username, hashedPassword, email, prefix, nickname, name, lastname],
    (error, results) => {
      if (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Registration failed" });
        return;
      }

      res.status(200).json({ message: "Registration successful" });
    }
  );
});

// User login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Retrieve user from the database
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (error, results) => {
      if (error || results.length === 0) {
        res.status(401).json({ message: "Authentication failed" });
        return;
      }

      const user = results[0];

      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        res.status(401).json({ message: "Authentication failed" });
        return;
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user.id }, "your-secret-key", {
        expiresIn: "1h",
      });

      res.json({ msg: "Login Succees and your token ", token });
    }
  );
});

/*readdirSync('./routes')
.map((r)=> app.use('/api', require('./routes/'+r)))*/



const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
