const express = require('express');
const router = express.Router();
var Candidato = require("../models/alta");
var requiresLogin = require("./requiresLogin");

// Index
router.get('/', (req, res) => {
    res.render('index');
});

// Logout 
router.get('/logout', function(req, res, next) {
    if (req.session) {
        // Borra la sesion
        req.session.destroy(function(err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

// Acceso al Panel de Control Administrador
router.get('/loginadmin', (req, res) => {
    res.render('loginadmin');
})

// Lista de Candidatos
router.get('/listacandidatos', function(req, res) {
    Candidato.find({}, function(err, candidatos, user) {
        if (err) {
            console.log(err);
        } else {
            res.render('listacandidatos', { candidatos: candidatos });
        }
        // Ordena alfabeticamente a los candidatos
    }).sort({ nombreApellido: 'asc' });
});

// Login Usuario - Test: OK
router.get('/loginuser', (req, res) => {
    res.render('loginuser');
});


// Registrar Candidato
router.get('/altacandidatos', requiresLogin, (req, res) => {
    res.render('altacandidatos');
});

// Error: Usted ya votó!
router.get('/ustedyavoto', (req, res) => {
    res.render('ustedyavoto');
});

// Registrar ADMIN
router.get('/registeradmin', (req, res) => {
    res.render('registeradmin');
});


// Rutea a la API
router.all('/votapi', (req, res) => {
    res.render('votapi');
});

// Resultados
router.get('/resultados', function(req, res) {
    Candidato.find({},
        function(err, candidatos) {
            if (err) {
                console.log(err);
            } else {
                
                res.render('resultados', { candidatos: candidatos });
            }
            // Ordena en forma descendente el listado, segun cantidad de votos
        }).sort({ votos: 'desc' });
});


module.exports = router;