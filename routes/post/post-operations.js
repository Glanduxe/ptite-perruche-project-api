const Accounts = require("../../db/models/Accounts");

module.exports = app => {

    app.post("/create-operations", (req, res) => {

        const accountID = req.body.accountID;
        const description = req.body.description;
        const amount = req.body.amount;
        const repeatNumber = req.body.repeatNumber;
        const isInfinite = req.body.isInfinite;
        const startDate = req.body.startDate;
        const typeId = req.body.typeId;

        if(repeatNumber > 0 && isInfinite) {
            return res.status(400).json({ data: "Une opération infinie n'a pas un nombre défini de répétitions." });
        }

        if(! repeatNumber && ! isInfinite) {
            return res.status(400).json({ data: "Il faut définir un nombre défini de répétitions à cette opération." });
        }

        return Accounts.findOne({
            where: {
                id: accountID
            }
        }).then(account => {
            if (account) {
                return account.createOperation({
                    description: description,
                    amount: amount,
                    repeatNumber: repeatNumber,
                    isInfinite: isInfinite,
                    startDate: startDate,
                    typeId: typeId
                }).then(() => {
                    return res.status(200).json({ data: "Opération créée et prise en compte." });
                })
            }
            return res.status(403).json({ data: "Access denied" });
        });

    });

}