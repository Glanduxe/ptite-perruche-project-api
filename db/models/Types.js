const sequelize = require("../config");
const DataTypes = require("sequelize");

const Types = sequelize.define("types", {
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
});

module.exports = Types;