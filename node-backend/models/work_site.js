module.exports = (sequelize, Sequelize) => {
  const Worksite = sequelize.define('Worksite', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    site_id: {
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
      tableName: "work_site", // Set the table name explicitly to match your database
    }
  );

  return Worksite;
};
