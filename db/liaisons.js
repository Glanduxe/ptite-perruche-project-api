const Users = require("./models/Users");
const Accounts = require("./models/Accounts");
const Operations = require("./models/Operations");
const Types = require("./models/Types");
const Timezones = require("./models/Timezones");

Users.hasMany(Accounts, { onDelete: "cascade" });

Users.belongsTo(Timezones, { onDelete: "cascade" });

Accounts.hasMany(Operations, { onDelete: "cascade" });

Operations.hasOne(Types, { onDelete: "cascade" });