const sequelize = require("./config");
const Users = require("./models/Users");
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
    .then(([user, created]) => {
        if (created) {
            Timezones.findOrCreate({
                where: {
                    tz: "Europe/Paris"
                }
            })
            .then(([timezone]) => {
                user.setTimezone(timezone.id)
                .then(() => { 
                    console.log(">> Update of tables and init values created.");
                })
            });
        } else {
            console.log(">> Nothing to do.");
        }
        // return sequelize.drop().then(() => console.log(">> All tables droped."));
    })
    .catch(e => console.log(e));
});