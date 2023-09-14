module.exports = (sequelize, Sequelize) => {
  const User = require('./user'); // Import the User model if not already imported

  const SupportSchedule = sequelize.define('support_schedule', {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      defaultValue: 0,
    },
    assign_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    site_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    start_time: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    end_time: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  },
    {
      timestamps: false, // Disable Sequelize's default timestamps
      tableName: "support_schedule", // Set the table name explicitly to match your database
    }
  );

  return SupportSchedule;
};
