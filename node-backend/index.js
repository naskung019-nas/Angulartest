const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { readdirSync } = require("fs");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors());

app.use(bodyParser.json());


readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
