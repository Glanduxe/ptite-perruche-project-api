const User = require("../../db/models/Users");
const Timezones = require("../../db/models/Timezones");
const jwt = require("../../utils/token");
const { body, validationResult } = require("express-validator");

module.exports = app => {

    app.post("/register", [
        body("pseudo", "Le pseudo doit être entre 2 et 10 caractères.").isLength({ min: 2, max: 10 }).trim().escape(),
        body("firstname", "Le prénom doit être entre 2 et 20 caractères.").isLength({ min: 2, max: 20 }).trim().escape(),
        body("lastname", "Le nom doit être entre 2 et 20 caractères.").isLength({ min: 2, max: 20 }).trim().escape(),
        body("accountName", "Le nom du compte doit être entre 2 et 10 caractères.").isLength({ min: 2, max: 10 }).trim().escape(),
        body("accountAmount", "Le montant du compte doit être un nombre.").isFloat().not().isString(),
        body("password", "Le mot de passe est obligatoire.").not().isEmpty(),
        body("confirmPwd", "Les mots de passe doivent correspondrent.").custom((value, {req}) => value === req.body.password)
    ], (req, res) => {

        const erreurValidation = validationResult(req);

        if(! erreurValidation.isEmpty()) {
            return res.status(400).json({ data: erreurValidation.array() });
        }

        return User.findOrCreate({
            where: {
                pseudo: req.body.pseudo
            },
            defaults: {
                firstName: req.body.firstname,
                lastName: req.body.lastname,
                password: req.body.password
            }
        }).then(([user, created]) => {
            if (! created) {
                return res.status(400).json({ data: `L'utilisateur avec le pseudo "${user.pseudo}" existe déjà.` });
            } else {
                user.createAccount({ name: req.body.accountName, amount: req.body.accountAmount })
                .then(() => {
                    Timezones.findOrCreate({
                        where: {
                            tz: req.body.timezone
                        }
                    }).then(([timezone]) => {
                        user.setTimezone(timezone.id).then(() => { 
                            return res.status(200).json({ data: `Utilisateur "${user.pseudo}" créé.` });
                        });
                    })
                })
            }
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
            where: {
                pseudo: pseudo
            }
        }).then(user => {
            if(user && user.validPassword(password)) {
                const token = jwt.generateTokenForUser(user.id);
                res.cookie("auth_token", token, {
                    httpOnly: true
                });
                return res.status(200).json({ data: user });
            }
            return res.status(400).json({ data: "Mot de passe incorrect." });
        });

    });

}