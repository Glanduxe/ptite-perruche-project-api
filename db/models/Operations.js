const sequelize = require("../config");
const DataTypes = require("sequelize");

const Operations = sequelize.define("operations", {
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    repeatNumber: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    }
});

module.exports = Operations;