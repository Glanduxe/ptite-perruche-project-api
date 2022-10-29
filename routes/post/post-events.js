const Accounts = require("../../db/models/Accounts");

module.exports = app => {

    app.post("/create-events", (req, res) => {

        const accountID = req.body.accountID;
        const name = req.body.name;
        const description = req.body.description;
        const amount = req.body.amount;
        const repeat = req.body.repeat;
        const date = req.body.date;
        const frequence = req.body.frequence;

        return Accounts.findOne({
            where: {
                id: accountID
            }
        }).then(account => {
            account.createEvent({
                name: name,
                description: description,
                amount: amount,
                date: date,
                frequence: frequence,
                repeat: repeat
            }).then(() => {
                return res.status(200).json({ data: "Évenement créé." });
            });
        });

    });

}