const sequelize = require("./config");
const Users = require("./models/Users");
const Types = require("./models/Types");
const Timezones = require("./models/Timezones");

sequelize.sync({alter: true})
.then(() => {
    let array = []; 
    const tz = Intl.supportedValuesOf('timeZone');
    tz.forEach(timezone => {
        array.push({ tz: timezone });
    })
    Timezones.bulkCreate(array, { updateOnDuplicate: ["tz"] })
    .then(() => {
        Users.findOrCreate({
            where: {
                pseudo: "Glanduxe"
            },
            defaults: {
                firstName: "Ptite",
                lastName: "Perruche",
                password: "qwerty-123",
                timezoneId: 353
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
            .then(() => { 
                console.log(">> Update of tables and init values created.");
                // return sequelize.drop().then(() => console.log(">> All tables droped."));
            })
        })
    })
    .catch(e => console.log(e));
});