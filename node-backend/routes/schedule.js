const express = require("express");
const router = express.Router();

const { get_schedule } = require("../controllers/schedule");

router.get("/get_schedule", get_schedule);

module.exports = router;
