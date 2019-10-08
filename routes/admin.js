var express = require('express');
var router = express.Router();
var Admin = require('../models/admin');

/* Aviso que no esta logueado */
router.get('/', function(req, res, next) {
    res.send('NO ESTAS LOGUEADO');
});

/* AGREGAR USUARIO NUEVO */
router.post("/", function(req, res, next) {
    console.log(req.body.usuario);
    console.log(req.body.pass);
    console.log(req.body.pass2);
    console.log(req.body.usuariolog);
    console.log('req.body.passlog');


    if (req.body.pass != req.body.pass2) {
        var err = new Error("La contraseña no coincide");
        err.status = 401;
        return next(err);
    }


    // Registra y/o loguea
    if (req.body.usuario && req.body.pass) {
        console.log('req.body')
        var adminData = {
            usuario: req.body.usuario,
            pass: req.body.pass,
            pass2: req.body.pass2
        }

        Admin.create(adminData, function(err, admin) {
            if (err) {
                return next(err);
            } else {
                req.session.adminId = admin._id;
                return res.redirect("/loginadmin");
            }
        });
    } else {
        //Logueando admin
        Admin.findOne({ pass: req.body.passlog }, function(err, data) {
            if (data) {
                if (data.pass == req.body.passlog) {
                    console.log("logueado!");
                    req.session.adminId = data._id;
                    console.log(req.session.adminId);
                    res.redirect('/altacandidatos');

                } else {
                    res.send({ "Success": "Contraseña incorrecta" });
                }
            } else {
                res.send({ "Success": "No sos ADMIN!" });
            }
        });
    }
});

module.exports = router;