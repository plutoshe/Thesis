var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment')
// var location = new mongoose.Schema ({
//     name : String,
//     id : Number 
// });

//var entity = new Schema({ index : Number, title : String, body: String, date: Date, like : Number });
// var connection = mongoose.createConnection("mongodb://localhost/thesis");
var connection = mongoose.connect('localhost', 'thesis');
 
autoIncrement.initialize(connection);

var faceSchema = new mongoose.Schema ({
        gender : Number,
        location : String,
        content : String, 
        // comment: [{ mark : Number, index : Number,  body: String, date: {type:Date,default:Date.now}, like : {type : Number, default : 0} }],
        updateTime: { type: Date, default: Date.now },
        // groupType : Number,
        // subclass : {type : Number, default : 0},
        // title : {type : String, default : 0},
        // sum : { type : Number, default : 0},
        face : String,
        // index : Number,
        // lastComment : {type:String, default : ""}

});

// var overall = new mongoose.Schema ({
//         lastIndex : Number
// })


faceSchema.plugin(autoIncrement.plugin, {model : 'face', filed : "itemID", startAt : 0, incrementBy : 1});
var facepp = connection.model('face', faceSchema);
// var version = new mongoose.Schema ({
// 		isCurrent : Number,
//         version : String,
//         download : Number,
//         update_content : String,
//         locationNum : Number
// });

//mongoose.model('entity', entity);
// mongoose.model('newLocation', location);
// mongoose.model('newComment', comment);
// mongoose.model('newVersion', version);
// 

// exports.location = mongoose.model('newLocation', location);;
exports.face = mongoose.model('face');
exports.db = connection
// exports.overall = mongoose.model('overall');
// exports.newVersion = mongoose.model('newVersion');


