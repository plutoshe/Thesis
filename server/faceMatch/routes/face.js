var facePP = require('faceppsdk'),
    verifyParams = {
        person_id : 'person_id'
    };
var express = require('express')
var mongoose = require("mongoose")
var router = express.Router();
var models = require('../models/face');
var faceModel = models.face;
var db = models.db
// var overallModel = models.overall;

var prefix = "http://182.92.243.187:3000/Face/"

router.post("/getFace", function(req, res) {
	console.log(req)

	var q = faceModel.find().sort({'_id': -1}).limit(20);
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
	q.exec(function(err, data) {
		// console.log("!!!!");
		if (err) return console.error(err);
		// var querystring = require("querystring");
		// var result = querystring.escape(ob)
		// console.table(ob)
		// console.log(result)
		// var results = {1 : "3"}
		 // res.writeHead(200, { 'Content-Type': 'text/plain' });
  		  // res.write(JSON.stringify(results.map(function (msg){ return {msgId: msg.fileName}; })));
  		
  		// res.end();
  		for (var i = 0; i < data.length; i++) {
  			if (data[i]["gender"] == "Female")  {
  				data[i].content = prefix + "Female/" + data[i]["face"] + ".jpg";
  				// console.log(data[i])
  			}
  			else  {
  				data[i].content = prefix + "Male/" + data[i]["face"] + ".jpg";
  				// data[i]["content"] = prefix + "Male/" + data[i]["face"] + ".jpg"
  				// console.log(data[i])
  			}
  		}	
  		// console.log(data)
	  		res.json({data:data});
	  		// console.table(data)
	  		console.log("send end!")
	  		res.end();
	     // `posts` will be of length 20
	});
});

router.post("/getRecentFace", function(req, res) {
	console.log(req)

	var q = faceModel.find().sort({'_id': -1}).limit(20);
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
	q.exec(function(err, data) {
		// console.log("!!!!");
		if (err) return console.error(err);
		// var querystring = require("querystring");
		// var result = querystring.escape(ob)
		// console.table(ob)
		// console.log(result)
		// var results = {1 : "3"}
		 // res.writeHead(200, { 'Content-Type': 'text/plain' });
  		  // res.write(JSON.stringify(results.map(function (msg){ return {msgId: msg.fileName}; })));
  		
  		// res.end();
  		for (var i = 0; i < data.length; i++) {
  			if (data[i]["gender"] == "Female")  {
  				data[i].content = prefix + "Female/" + data[i]["face"] + ".jpg";
  				// console.log(data[i])
  			}
  			else  {
  				data[i].content = prefix + "Male/" + data[i]["face"] + ".jpg";
  				// data[i]["content"] = prefix + "Male/" + data[i]["face"] + ".jpg"
  				// console.log(data[i])
  			}
  		}	
  		// console.log(data)
	  		res.json({data:data});
	  		// console.table(data)
	  		console.log("send end!")
	  		res.end();
	     // `posts` will be of length 20
	});
// or you can chain it together simply like that:

// models.Post
// .find({published: true})
// .sort({'date': -1})
// .limit(20)
// .exec(function(err, posts) {
     // `posts` will be of length 20
// });
});


router.post('/newface', function(req, res) {
	var newFace = new faceModel({
		name : req.body.name, 
		updateTime: new Date(), 
		content : req.body.content, 
		gender : req.body.gender, 
		face : req.body.face, 
		url : req.body.url
	});
	newFace.save();
	res.end();
});



module.exports = router;