const Users = require("./models/Users");
const Accounts = require("./models/Accounts");
const Operations = require("./models/Operations");
const Timezones = require("./models/Timezones");
const Events = require("./models/Events");

Users.hasMany(Accounts, { onDelete: "cascade" });
Accounts.belongsTo(Users, { onDelete: "cascade" });

Users.belongsTo(Timezones, { onDelete: "cascade" });

Accounts.hasMany(Operations, { onDelete: "cascade" });

Events.hasMany(Operations, { onDelete: "cascade" });

Accounts.hasMany(Events, { onDelete: "cascade" });
Events.belongsTo(Accounts, { onDelete: "cascade" });
