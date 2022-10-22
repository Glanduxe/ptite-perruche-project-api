const Users = require("../../db/models/Users");

module.exports = app => {

    app.post("/create-account", (req, res) => {

        const userId = req.app.get("token");
        const name = req.body.name;
        const amount = req.body.amount;

        const nameRegex = /^[a-zA-Z,\-\ ]+$/;

        if(! name.match(nameRegex)) {
            return res.status(400).json({ data: "Nom de compte de la mauvaise forme." });
        }

        if(! Number.isFinite(amount)) {
            return res.status(400).json({ data: "Le solde du compte doit être un nombre." });
        }

        Users.findOne({
            where: {
                id: userId
            }
        })
        .then(user => {
            user.createAccount({
                name: name,
                amount: amount
            })
            .then(() => {
                return res.status(200).json({ data: "Compte créé." });
            })
        })

    });

}