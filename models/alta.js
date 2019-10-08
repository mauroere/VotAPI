var mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const AltaSchema = mongoose.Schema({
    nombreApellido: {
        type: String
    },

    partido: {
        type: String,
        enum: ['Partido Rojo', 'Partido Naranja', 'Partido Verde'],
    },

    foto: {
        type: String,
    },

    votos: {
        type: Number,
        default: 0

    },

    _id: {
        type: ObjectId,
        auto: true,
    },

    RegistradoEl: { type: Date, default: Date.now }
}, {
    versionKey: false

});

var Candidato = mongoose.model("Candidato", AltaSchema);
module.exports = Candidato;