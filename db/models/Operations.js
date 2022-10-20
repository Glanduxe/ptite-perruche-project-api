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
        allowNull: true
    },
    isInfinite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
});

module.exports = Operations;