const sequelize = require("../config");
const DataTypes = require("sequelize");

const TimeZones = sequelize.define("timezones", {
    tz: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
});

module.exports = TimeZones;