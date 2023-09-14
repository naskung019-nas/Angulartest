const db = require("../models/index");

const { User, SupportSchedule, Assignment, Worksite } = db;
//db.sequelize.sync();
exports.createSupportSchedule = async (req, res) => {
  try {
    // Extract the data you want to insert from the request body
    const { user_id, assign_id, site_id, start_time, end_time } = req.body;

    // Use Sequelize's create method to insert a new record into the database
    const newSchedule = await SupportSchedule.create({
      user_id,
      assign_id,
      site_id,
      start_time,
      end_time,
    });

    // Respond with a success message and the newly created record
    return res.status(201).json({
      message: 'Support schedule created successfully',
      schedule: newSchedule,
    });
  } catch (error) {
    console.error('Error creating support schedule:', error);
    // Handle any errors and respond with an error message
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

exports.get_schedule = async (req, res) => {
  try {
    const schedules = await SupportSchedule.findAll({
      attributes: ['id',"start_time", "end_time"],
      include: [
        {
          model: User,
          attributes: [
            "id",
            "username",
            "email",
            "tel",
            "prefix",
            "nickname",
            "firstname",
            "lastname",
            "role",
          ],
        },
        {
          model: Assignment,
          attributes: ["id","assign_id","name"],
        },
        {
          model: Worksite,
          attributes: ["id","site_id","site_name"],
        },
      ],
    });

    // Check if there are no schedules found
    if (!schedules || schedules.length === 0) {
      return res.status(404).json({ message: "No support schedules found." });
    }

    // Respond with the retrieved support schedules
    res.status(200).json(schedules);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.get_schedule_id = async (req, res) => {
  try {
    const id = req.params.id;
    const get_id = await SupportSchedule.findByPk(id,{attributes: ['id',"start_time", "end_time"],
    include: [
      {
        model: User,
        attributes: [
          "id",
          "username",
          "email",
          "tel",
          "prefix",
          "nickname",
          "firstname",
          "lastname",
          "role",
        ],
      },
      {
        model: Assignment,
        attributes: ["id","assign_id","name"],
      },
      {
        model: Worksite,
        attributes: ["id","site_id","site_name"],
      },
    ],})
    
    // Check if the schedule was found
    if (!get_id) {
      return res.status(404).json({ message: "Schedule not found." });
    }

    // Respond with the retrieved schedule
    res.status(200).json(get_id);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};



//------------------

exports.get_schedule_id = async (req, res) => {
  try {
    const id = req.params.id;
    const get_id = await SupportSchedule.findByPk(id,{attributes: ['id',"start_time", "end_time"],
    include: [
      {
        model: User,
        attributes: [
          "id",
          "username",
          "email",
          "tel",
          "prefix",
          "nickname",
          "firstname",
          "lastname",
          "role",
        ],
      },
      {
        model: Assignment,
        attributes: ["id","assign_id","name"],
      },
      {
        model: Worksite,
        attributes: ["id","site_id","site_name"],
      },
    ],})
    
    // Check if the schedule was found
    if (!get_id) {
      return res.status(404).json({ message: "Schedule not found." });
    }

    // Respond with the retrieved schedule
    res.status(200).json(get_id);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
exports.updateSupportSchedule = async (req, res) => {
  try {
    // Extract the schedule ID and updated data from the request body
    const { id } = req.params; // Assuming the ID is passed as a route parameter
    const { user_id, assign_id, site_id, start_time, end_time } = req.body;

    // Use Sequelize's update method to find and update the record by ID
    const [updatedRowsCount, updatedRows] = await SupportSchedule.update(
      {
        user_id,
        assign_id,
        site_id,
        start_time,
        end_time,
      },
      {
        where: { id },
        returning: true, // This option returns the updated record
      }
    );

    if (updatedRowsCount === 0) {
      // No records were updated (ID not found)
      return res.status(404).json({
        error: 'Support schedule not found',
      });
    }

    // Respond with a success message and the updated record
    return res.status(200).json({
      message: 'Support schedule updated successfully',
      schedule: updatedRows[0], // Assuming only one row was updated
    });
  } catch (error) {
    console.error('Error updating support schedule:', error);
    // Handle any errors and respond with an error message
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};


exports.assignment = async (req, res) => {
  try {

    const assignments = await Assignment.findAll({
      attributes: ["id", "assign_id", "name"],
    });
    

    if (assignments.length === 0) {
      return res.status(404).json({ message: "No assignments found." });
    }


    res.status(200).json(assignments);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: "Server Error" });
  }
};

exports.worksite = async (req, res) => {
  try {
    const worksite = await Worksite.findAll({
      attributes: ["id", "site_id", "site_name"],
    });
    
    if (worksite.length === 0) {
      return res.status(404).json({ message: "No worksites found." });
    }

    res.status(200).json(worksite);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: "Server Error" });
  }
};

exports.users = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "password","email","tel","prefix","nickname","firstname","lastname","role"],
    });
    
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }

    res.status(200).json(users);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ message: "Server Error" });
  }
};




