const bcrypt = require("bcrypt");

const userModel = require("../models/user");

exports.signup= (req, res) => {
   bcrypt.hash(req.body.password, 10, (err, hash) => {
       if (err)
        res.send("erreur bcrypt");
        else {
            req.body.password = hash;
            userModel.createUser(req.body.username, req.body.mail, req.body.password)
                .then(sqlResult => {
                    if (sqlResult) {
                        res.redirect("/user/login");
                    }else {
                        error = "unknown error"
                        res.render("register", error);
                    }
                })
                .catch(sqlError => { 
                    error = "a user with this email already exists"
                    res.render("register", {error: error});
                 });
        }
   })
}

exports.renderLogin = (req, res) => {
    res.render("login");
}

exports.login= (req, res) => {
     userModel.getUserByMail(req.body.mail)
         .then(sqlResult => {
             if (sqlResult.length !== 0) {
                 bcrypt.compare(req.body.password, sqlResult[0].sha)
                     .then(valid => {
                         if (!valid)
                            res.render("login", {errorLogin: "mot de passe incorrect"});
                         else {
                             global.userId = sqlResult[0].id;
                             req.session.userId = sqlResult[0].id;
                             console.log("req.session.id: " + req.session.userId);
                             res.redirect('/project');
                         }
                     })
             }
             else
                res.render("login", {errorLogin: "aucun utilisateur ne correspond à cette addresse mail"});
         })
         .catch(err => {
             res.json({error: err});
         });
}

exports.renderRegister = (req, res) => {
    res.render("register");
}

exports.logout = (req, res) => {
    res.send("logout");
}