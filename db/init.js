const sequelize = require("./config");
const Users = require("./models/Users");
const Types = require("./models/Types");
const TimeZones = require("./models/TimeZones");

return sequelize.sync({alter: true})
.then(() => {
    return TimeZones.bulkCreate([
        { tz: "UTC-8" },
        { tz: "UTC-7" },
        { tz: "UTC-6" },
        { tz: "UTC-5" },
        { tz: "UTC-4" },
        { tz: "UTC-3" },
        { tz: "UTC-2" },
        { tz: "UTC-1" },
        { tz: "UTC" },
        { tz: "UTC+1" },
        { tz: "UTC+2" },
        { tz: "UTC+3" },
        { tz: "UTC+4" },
        { tz: "UTC+5" },
        { tz: "UTC+6" },
        { tz: "UTC+7" },
        { tz: "UTC+8" },
        { tz: "UTC+9" },
        { tz: "UTC+10" },
        { tz: "UTC+11" },
        { tz: "UTC+12" },
        { tz: "UTC+13" },
    ], { updateOnDuplicate: ["tz"] })
    .then(() => {
        return Users.findOrCreate({
            where: {
                pseudo: "Glanduxe"
            },
            defaults: {
                firstName: "Ptite",
                lastName: "Perruche",
                password: "qwerty-123",
                timezoneId: 11
            }
        })
        .then(() => {
            return Types.bulkCreate([
                { name: "Yearly" },
                { name: "Monthly" },
                { name: "Weekly" },
                { name: "Daily" },
                { name: "Quarterly" }
            ], { updateOnDuplicate: ["name"] })
            .then(() => console.log(">> Update of tables and init values created."))
        })
    })
    .catch(e => console.log(e));
});