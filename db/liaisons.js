const Users = require("./models/Users");
const Accounts = require("./models/Accounts");
const Operations = require("./models/Operations");
const Types = require("./models/Types");
const Timezones = require("./models/Timezones");

Users.hasMany(Accounts, { onDelete: "cascade" });
Accounts.belongsTo(Users, { onDelete: "cascade" });

Users.belongsTo(Timezones, { onDelete: "cascade" });

Accounts.hasMany(Operations, { onDelete: "cascade" });
Operations.belongsTo(Accounts, { onDelete: "cascade" });

Operations.belongsTo(Types, { onDelete: "cascade" });