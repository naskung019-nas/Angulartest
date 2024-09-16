module.exports = (sequelize, Sequelize) => {
  const Assignment = sequelize.define('Assignment', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    assign_id: {
      type: Sequelize.STRING(255),
      defaultValue: null,
    },
    name: {
      type: Sequelize.STRING(255),
      defaultValue: null,
    },
  }, 
    {
      timestamps: false, // Disable Sequelize's default timestamps
      tableName: "assignment", // Set the table name explicitly to match your database
    }
  );

  return Assignment;
};
