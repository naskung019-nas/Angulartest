const express = require("express");
const router = express.Router();

const { get_schedule,assignment,users,worksite,get_schedule_id,createSupportSchedule,updateSupportSchedule } = require("../controllers/schedule");

router.get("/get_schedule", get_schedule);
router.get("/get_schedule/:id", get_schedule_id);
router.get("/assignment", assignment);
router.get("/worksite", worksite);
router.get("/users", users);
router.post("/create_schedule",createSupportSchedule);
router.put("/put_schedule/:id",updateSupportSchedule);

module.exports = router;
