module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    tel: {
      type: Sequelize.INTEGER(10),
      allowNull: true,
    },
    prefix: {
      type: Sequelize.ENUM('Mr', 'Miss'),
      defaultValue: 'Mr',
    },
    nickname: {
      type: Sequelize.STRING(255),
      defaultValue: '',
    },
    firstname: {
      type: Sequelize.STRING(255),
      defaultValue: '',
    },
    lastname: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    role: {
      type: Sequelize.ENUM('admin', 'user'),
      defaultValue: 'user',
    },
    },
    {
      timestamps: false, // Disable Sequelize's default timestamps
      tableName: "users", // Set the table name explicitly to match your database
    }
  );

  return User;
};
