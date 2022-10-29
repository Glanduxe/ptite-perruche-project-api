const sequelize = require("../config");
const DataTypes = require("sequelize");

const Events = sequelize.define("events", {
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    frequence: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    repeat: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

module.exports = Events;