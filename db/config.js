const Sequelize = require("sequelize");
const CONFIG = require("./infos");

// Initialize database connection
const db = new Sequelize(
    CONFIG.dbname,
    CONFIG.user,
    CONFIG.password, {
        dialect: CONFIG.type,
        host: CONFIG.host,
        logging: false
    }
);

(async () => {
    try {
        await db.authenticate();
        console.log(">> Connection has been established successfully.");
    } catch (e) {
        console.error("Unable to connect to the database:", e);
    }
})();

module.exports = db;