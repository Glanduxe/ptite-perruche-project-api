const Sequelize = require("sequelize");
const cron = require('node-cron');

const Operations = require("../db/models/Operations");

// Cron each minute (for development)
cron.schedule("* * * * *", () => {

    Operations.findAll({
        where: {
            [Sequelize.Op.and]: {
                repeatNumber: {
                    [Sequelize.Op.or]: {
                        [Sequelize.Op.gt]: Sequelize.col("operations.count"),
                        [Sequelize.Op.eq]: -1
                    }
                },
                startDate: {
                    [Sequelize.Op.not]: null
                }
            }
        }, logging: console.log}).then(op => {
            op.forEach(element => {
                element.getAccount().then(account => {
                    account.getUser().then(user => {
                        user.getTimezone().then(({tz}) => {
                            const userTimezone = tz;
                            const currentUtcDate = new Date().toISOString();
                            const currentUserDate = currentUtcDate.split("T")[0];
                            // if (currentUserDate === element.startDate) {
                            //     console.log(true);
                            // } else {
                            //     console.log(false);
                            // }
                        })
                    })
                });
            });
        });

});