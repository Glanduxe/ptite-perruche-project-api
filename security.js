const { verifyToken } = require("./utils/token");

module.exports = app => {

    app.use((req, res, next) => {
        app.set("token", 1);
        next();
    });

}