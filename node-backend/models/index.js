const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.sequelize.sync();

db.User = require("./user")(sequelize, Sequelize);
db.SupportSchedule = require("./support_schedule")(sequelize, Sequelize);
db.Assignment = require("./assignment")(sequelize, Sequelize);
db.Worksite = require("./work_site")(sequelize, Sequelize);

db.SupportSchedule.hasMany(db.User, {
  foreignKey: { name: "id", field: "id" },
  sourceKey: "user_id",
});
db.SupportSchedule.hasMany(db.Assignment, {
  foreignKey: { name: "id", field: "id" },
  sourceKey: "assign_id",
});
db.SupportSchedule.hasMany(db.Worksite, {
  foreignKey: { name: "id", field: "id" },
  sourceKey: "site_id",
});

db.User.belongsTo(db.SupportSchedule, { foreignKey: "id" });
db.Assignment.belongsTo(db.SupportSchedule, { foreignKey: "id" });
db.Worksite.belongsTo(db.SupportSchedule, { foreignKey: "id" });

module.exports = db;
