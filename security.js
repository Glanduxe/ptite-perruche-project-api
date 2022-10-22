const { verifyToken } = require("./utils/token");

module.exports = app => {

    app.use((req, res, next) => {
        // const cookie = req.headers.cookie.split("=")[1];
        app.set("token", 1);
        next();
    });

}