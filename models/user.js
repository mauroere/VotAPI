var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
    nombreApellido: {
        type: String,
    },
    dni: {
        type: Number,

    },
    voto: {
        type: Boolean,
        default: false,

    },
    sexo: {
        type: String,
        enum: ['femenino', 'masculino'],
    },

    Ingreso: { type: Date, default: Date.now }
}, {
    versionKey: false
});

var User = mongoose.model("User", UserSchema);
module.exports = User;