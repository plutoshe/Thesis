var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment')
// var connection = mongoose.createConnection("mongodb://localhost/thesis");
var connection = mongoose.connect('localhost', 'thesis');
 
autoIncrement.initialize(connection);

var faceSchema = new mongoose.Schema ({
        gender : String,
        location : String,
        content : String, 
        updateTime: { type: Date, default: Date.now },
        face : String,
});




faceSchema.plugin(autoIncrement.plugin, {model : 'face', filed : "itemID", startAt : 0, incrementBy : 1});
var facepp = connection.model('face', faceSchema);
exports.face = mongoose.model('face');
exports.db = connection


