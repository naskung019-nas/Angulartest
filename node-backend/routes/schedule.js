const express = require("express");
const router = express.Router();

const { get_schedule,get_schedule_id } = require("../controllers/schedule");

router.get("/get_schedule", get_schedule);
router.get("/get_schedule/:id", get_schedule_id);

module.exports = router;
