var express = require('express');
var router = express.Router();
var User = require('../models/user');


/* Aviso de ingreso sin registro */
router.get('/', function(req, res, next) {
    res.send('NO ESTAS LOGUEADO');
});

/* AGREGAR USUARIO NUEVO */
router.post("/", function(req, res, next) {
    console.log(req.body.nombreApellido);
    console.log(req.body.dni);
    console.log(req.body.sexo);



    // Registra y habilita ingreso a la votación
    if (req.body.nombreApellido && req.body.dni && req.body.sexo) {
        console.log(req.body);
        var userData = {
            nombreApellido: req.body.nombreApellido,
            dni: req.body.dni,
            sexo: req.body.sexo,
        }
       

        User.create(userData, function(err, user) {
            if (err) {
                return next(err);
            } else {
                // Guardo el ID de sesión como variable para luego llamarla desde la API
                req.session.userId = user._id;
                if (req.session.userId)

                    return res.redirect("/listacandidatos");
            }
        });

    } else {
        res.send({ success: "Ingreso denegado" });
    }


});


module.exports = router;