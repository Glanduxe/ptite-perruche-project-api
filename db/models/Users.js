const sequelize = require("../config");
const DataTypes = require("sequelize");
const Accounts = require("./Accounts");
const bcrypt = require("bcrypt");
const salt = 8;

const Users = sequelize.define("users", {
    pseudo: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    indexes: [{ unique: true, fields: ["pseudo"] }],
    hooks: {
        beforeCreate: user => {
            if (user.changed('password')) {
                user.password = bcrypt.hashSync(user.password, salt);
            }
        },
        afterCreate: user => {
            Accounts.create({name: "Default", amount: 0, userId: user.id});
        }
    }
});

Users.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = Users;