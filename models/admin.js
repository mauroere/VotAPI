var mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    usuario: {
        type: String,
    },
    pass: {
        type: String,
    },
    pass2: {
        type: String,
    },
});

var Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;