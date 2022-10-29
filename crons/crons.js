const Sequelize = require("sequelize");
const cron = require('node-cron');

const Events = require("../db/models/Events");

// Cron each minute (for development)
cron.schedule("* * * * *", () => {

    Events.findAll({
        where: {
            active: true
        }
    })
    .then(events => {
        events.forEach(event => {
            event.getAccount().then(account => {
                account.getUser().then(user => {
                    user.getTimezone().then(tz => {
                        const userTZ = tz.tz;
                        const userDate = new Date().toLocaleDateString("en-CA", { timeZone: userTZ });
                        event.countOperations().then(count => {
                            console.log(count);
                        })
                    })
                })
            })
        })
    });

});