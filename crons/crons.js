const cron = require('node-cron');

const Accounts = require("../db/models/Accounts");
const Operations = require("../db/models/Operations");

cron.schedule("0 * * * *", () => {

    console.log("Run task every hour.");

});