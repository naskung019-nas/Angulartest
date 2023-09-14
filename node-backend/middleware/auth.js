const { async } = require("rxjs");
const db = require("../config/database");
const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  try {
    const token = req.headers["authtoken"];

    if (!token) {
      return res.status(401).send("no token , authorization denied");
    }
    const decoded = jwt.verify(token, "jwtSecret");

    console.log("middleware", decoded);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send("Token Invavid!!");
  }
};

exports.adminCheck =  (req, res, next) => {
  try {
    const { username } = req.user
    db.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      async (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).send({ err: "Error" });
        }

        if (results.length === 0) {
          return res.status(403).send("Admin access denine");
        } else {
          const userRole = results[0].role;
          if (userRole !== 'admin') {
            return res.status(403).send("USER");
          } else {
            await next()
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: "Error" });
  }
};
