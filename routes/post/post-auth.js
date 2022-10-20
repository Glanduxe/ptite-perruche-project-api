const User = require("../../db/models/Users");
const jwt = require("../../utils/token");

module.exports = app => {

    app.post("/register", (req, res) => {

        const pseudo = req.body.pseudo;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const accountName = req.body.accountName;
        const accountAmount = req.body.accountAmount;
        const password = req.body.password;
        const confirmPwd = req.body.confirmPwd;

        const pseudoRegex = /^[a-zA-Z0-9]+$/;
        const nameRegex = /^[a-zA-Z,\-\ ]+$/;
        const amountRegex = /^[0-9.]+$/;

        if(! pseudo || ! password || ! confirmPwd || ! firstname || ! lastname || ! accountName || ! accountAmount) {
            return res.status(400).json({ data: "Tous les champs sont obligatoires." });
        }

        if(password != confirmPwd) {
            return res.status(400).json({ data: "Les mots de passe ne correspondent pas." });
        }

        if(! pseudo.match(pseudoRegex)) {
            return res.status(400).json({ data: "Le pseudo n'est pas de la bonne forme." });
        }

        if(! firstname.match(nameRegex) || ! lastname.match(nameRegex) || ! accountName.match(nameRegex)) {
            return res.status(400).json({ data: "Prénom ou Nom ou Nom de compte de la mauvaise forme." });
        }

        if(! accountAmount.match(amountRegex)) {
            return res.status(400).json({ data: "Le solde du compte doit être un nombre." });
        }

        return User.findOrCreate({
            where: {
                pseudo: pseudo
            },
            defaults: {
                firstName: firstname,
                lastName: lastname,
                password: password
            }
        })
        .then(([user, created]) => {
            if (! created) {
                return res.status(400).json({ data: `L'utilisateur avec le pseudo "${user.pseudo}" existe déjà.` });
            }
            user.createAccount({ name: accountName, amount: accountAmount })
            .then(user => {
                console.log(user);
                return res.status(200).json({ data: `Utilisateur "${pseudo}" créé.` });
            })
        })

    });

    app.post("/login", (req, res) => {

        const pseudo = req.body.pseudo;
        const password = req.body.password;
        const pseudoRegex = /^[a-zA-Z0-9]+$/;

        if(! pseudo || ! password) {
            return res.status(400).json({ data: "Tous les champs sont obligatoires." });
        }

        if(! pseudo.match(pseudoRegex)) {
            return res.status(400).json({ data: "Le pseudo n'est pas de la bonne forme." });
        }

        return User.findOne({
            attributes: ["id", "pseudo", "password"],
            where: {
                pseudo: pseudo
            }
        })
        .then(user => {
            if(user && user.validPassword(password)) {
                const token = jwt.generateTokenForUser(user.id);
                res.cookie("auth_token", token, {
                    httpOnly: true
                });
                return res.status(200).json({ data: user });
            }
            return res.status(400).json({ data: "Mot de passe incorrect." });
        })

    });

}