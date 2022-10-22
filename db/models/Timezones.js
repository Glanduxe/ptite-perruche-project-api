const sequelize = require("../config");
const DataTypes = require("sequelize");

const Timezones = sequelize.define("timezones", {
    tz: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
}, {
    indexes: [{ unique: true, fields: ["tz"] }]
});

module.exports = Timezones;