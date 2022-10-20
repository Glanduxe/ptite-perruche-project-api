const Accounts = require("../../db/models/Accounts");

module.exports = app => {

    app.put("/modify-account", (req, res) => {

        const accountID = req.body.accountID;
        const accountName = req.body.accountName;
        const accountAmount = req.body.accountAmount;

        const nameRegex = /^[a-zA-Z,\-\ ]+$/;
        const amountRegex = /^[0-9.]+$/;

        if(! accountName.match(nameRegex)) {
            return res.status(400).json({ data: "Nom de compte de la mauvaise forme." });
        }

        if(! accountAmount.match(amountRegex)) {
            return res.status(400).json({ data: "Le solde du compte doit être un nombre." });
        }
        
        return Accounts.findOne({
            where: { 
                id: accountID,
                userId: req.app.get("token")
            }
        }).then(account => {
            if (account) {
                return account.update({
                    name: accountName,
                    amount: accountAmount
                }, {
                    where: {
                        id: account.id
                    }
                }).then(() => {
                    return res.status(200).json({ data: "Le compte a été modifié." });
                })
            }
            return res.status(403).json({ data: "Access denied" });
        });

    });

}