const Timezones = require("../../db/models/Timezones");
const Users = require("../../db/models/Users");

module.exports = app => {

    app.put("/modify-users", (req, res) => {

        const userId = 1;
        const pseudo = req.body.pseudo;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const currentPwd = req.body.currentPwd;
        const newPwd = req.body.newPwd;
        const confirmNewPwd = req.body.confirmNewPwd;
        const timezone = req.body.timezone;

        const pseudoRegex = /^[a-zA-Z0-9]+$/;
        const nameRegex = /^[a-zA-Z,\-\ ]+$/;

        if(! pseudo.match(pseudoRegex)) {
            return res.status(400).json({ data: "Le pseudo n'est pas de la bonne forme." });
        }

        if(! firstname.match(nameRegex) || ! lastname.match(nameRegex)) {
            return res.status(400).json({ data: "Prénom ou Nom de la mauvaise forme." });
        }

        if(newPwd != confirmNewPwd) {
            return res.status(400).json({ data: "Les mots de passe ne correspondent pas." });
        }
        
        return Users.findOne({
            where: {
                id: userId
            }
        })
        .then(user => {
            if(user && user.validPassword(currentPwd)) {
                user.update({
                    pseudo: pseudo,
                    firstName: firstname,
                    lastName: lastname,
                    password: newPwd
                }).then(user => {
                    Timezones.findOrCreate({
                        where: {
                            tz: timezone
                        }
                    }).then(([timezone]) => {
                        user.setTimezone(timezone.id).then(() => {
                            return res.status(200).json({ data: "Informations utilisateur modifiées avec succès." });
                        });
                    });
                }).catch(() => { return res.status(400).json({ data: `L'utilisateur avec le pseudo "${pseudo}" existe déjà.` }) });
            } else {
                return res.status(400).json({ data: "Mot de passe actuel incorrect." });
            }
        });

    });

}