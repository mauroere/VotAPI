var Candidato = require("../../models/alta");
var express = require("express");
var routerApi = express.Router();
var User = require("../../models/user");



/* MOSTRAR TODOS LOS CANDIDATOS */
routerApi.get("/", function(req, res, next) {
    Candidato.find({
            nombreApellido: 1,
            partido: 1,
            votos: 1,
            foto: 1,
            _id: 1,
            length: { $size: $votos }
        }, {
            $sort: { "length": -1 }
        },
        (err, candidatos) => {
            if (err) return res.status(500).send(err);
            res.status(200).render(
                'listacandidatos', {
                    candidatos: candidatos,
                    nombreApellido: nombreApellido,
                    foto: foto,
                    partido: partido,
                    votos: votos
                }
            );

        }

    );

});


/* AGREGAR CANDIDATO NUEVO */
routerApi.post("/", function(req, res, next) {
    var candidatos = new Candidato({
        nombreApellido: req.body.nombreApellido,
        partido: req.body.partido,
        foto: req.body.foto
    });

    candidatos.save(function(err, response) {
        if (err) return res.status(500).send(error);
        if (response) {
            res.status(200).redirect("/listacandidatos");
        } else {
            res.status(500).send(new Error("No se pudo dar de alta"));
        }
    });
});

/* VOTAR */

routerApi.post('/:id/', function(req, res, next) {
    if (req.params.id) {

        Candidato.update({ _id: req.params.id }, { $inc: { votos: 1 } }, { safe: true },
            function(err, response) {
                if (err) return res.status(500).send(error);
                if (response) {
                    User.updateOne({ _id: req.session.userId }, { $set: { voto: true } }, { safe: true },
                        function(err, response) {
                            if (err) return res.status(500).send(new Error("No se actualizo el voto"));
                            if (response) {
                                res.status(200).redirect('/resultados');

                                // Corroboro el proceso de voto
                                console.log('Voto exitoso!')
                                console.log('ID de sesion del votante: ', req.session.userId);
                            }

                        });
                } else {
                    res.status(500).send(new Error("No se pudo votar"));

                }
            });
    }
});


// Ya votó

routerApi.get("/:dni", function(req, res, next){
    if (req.params.dni) {
      User.findOne({ dni: req.params.dni }, (err, voto) => {
        if(voto) {
          return res.status(200).send("200");
        }
        if(!voto) {
          return res.status(404).send("404");
        }
        if (err) {
          return res.status(500).send("500");
        }
      }) 
    }
});


module.exports = routerApi;