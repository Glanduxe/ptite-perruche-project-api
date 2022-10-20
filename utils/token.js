const jwt = require("jsonwebtoken");

module.exports = {

    JWT_SIGN_SECRET: "thisIsADevelopmentKeyPleaseDoNotUseItInProduction!",

    generateTokenForUser: data => {
        return jwt.sign({
            id: data
        },
        module.exports.JWT_SIGN_SECRET,
        { expiresIn: "7d" }
        );
    },

    verifyToken: token => {
        return jwt.verify(token, module.exports.JWT_SIGN_SECRET, (err, decoded) => {
            console.log(decoded.foo);
        });
    }

};