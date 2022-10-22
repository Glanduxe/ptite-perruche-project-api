const sequelize = require("./config");
const Users = require("./models/Users");
const Types = require("./models/Types");
const Timezones = require("./models/Timezones");

sequelize.sync({alter: true})
.then(() => {
    Users.findOrCreate({
        where: {
            pseudo: "Glanduxe"
        },
        defaults: {
            firstName: "Ptite",
            lastName: "Perruche",
            password: "qwerty-123"
        }
    })
    .then(([user]) => {
        Timezones.findOrCreate({
            where: {
                tz: "Europe/Paris"
            }
        })
        .then(([timezone]) => {
            user.setTimezone(timezone.id)
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
    })
    .catch(e => console.log(e));
});