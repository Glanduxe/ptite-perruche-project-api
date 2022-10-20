const sequelize = require("../config");
const DataTypes = require("sequelize");

const Account = sequelize.define("accounts", {
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

module.exports = Account;