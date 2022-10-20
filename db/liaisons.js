const Users = require("./models/Users");
const Accounts = require("./models/Accounts");
const Operations = require("./models/Operations");
const Types = require("./models/Types");
const TimeZones = require("./models/TimeZones");

Users.hasMany(Accounts, { onDelete: "cascade" });
Accounts.belongsTo(Users);

Users.belongsTo(TimeZones);

Accounts.hasMany(Operations, { onDelete: "cascade" });
Operations.belongsTo(Accounts);

Operations.belongsTo(Types);