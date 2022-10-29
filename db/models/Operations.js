const sequelize = require("../config");
const DataTypes = require("sequelize");

const Operations = sequelize.define("operations", {
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    mouvement: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

module.exports = Operations;