const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("support_schedule2", "root", "", {
  host: "localhost",
  dialect: "mysql",
  port: "3306",
  define: {
    timestamps: false,
  },
});
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
  sourceKey: "user_id", //<- เป็นการกำหนดว่าใช้ FK ชื่ออะไรเวลาเราเรียกฝช่งานให้เราใช้ name ที่เราตั้ง ในการใช้งานแนะครับ เผื่อเวลาที่เราเปลี่ยนชื่อFKใน database จะได้ไม่งง
});
db.SupportSchedule.hasMany(db.Assignment, {
  foreignKey: { name: "id", field: "id" },
  sourceKey: "assign_id", //<- เป็นการกำหนดว่าใช้ FK ชื่ออะไรเวลาเราเรียกฝช่งานให้เราใช้ name ที่เราตั้ง ในการใช้งานแนะครับ เผื่อเวลาที่เราเปลี่ยนชื่อFKใน database จะได้ไม่งง
});
db.SupportSchedule.hasMany(db.Worksite, {
  foreignKey: { name: "id", field: "id" },
  sourceKey: "site_id", //<- เป็นการกำหนดว่าใช้ FK ชื่ออะไรเวลาเราเรียกฝช่งานให้เราใช้ name ที่เราตั้ง ในการใช้งานแนะครับ เผื่อเวลาที่เราเปลี่ยนชื่อFKใน database จะได้ไม่งง
});

db.User.belongsTo(db.SupportSchedule, { foreignKey: "id" });
db.Assignment.belongsTo(db.SupportSchedule, { foreignKey: "id" });
db.Worksite.belongsTo(db.SupportSchedule, { foreignKey: "id" });




/*db.SupportSchedule.hasMany(db.User, {
  foreignKey: 'id', // Name of the foreign key in SupportSchedule
  sourceKey: 'user_id', // Name of the key in User that the foreign key references
});

db.User.belongsTo(db.SupportSchedule, {
  foreignKey: 'id', // Name of the foreign key in User
});*/

module.exports = db;
