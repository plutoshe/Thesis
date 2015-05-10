var facePP = require('faceppsdk'),
    verifyParams = {
        person_id : 'person_id'
    };

facePP.api_key = 'c0556a067cd9d9ab7339121347691463';
facePP.api_secret = 'mpBPS8aMXKuWrcvS901Uk309nGzX1fhg';

var express = require('express');
var router = express.Router();
var async = require('async')
/* GET users listing. */

var request = require('request'),
    _ = require('underscore');
var formidable = require("formidable")
var mongoose = require("mongoose")
var models = require('../models/face');
var faceModel = models.face;
var db = models.db


/***
GET REQUEST :
/detect
/addFaceToPerson
/getGroupInfo
/createPerson
/addPersonToGroup
/createGroup
/getGroupList
/getPersonList
***/
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require('fs');
var path = require('path');

router.get("/test", function(req, res) {
	res.render("demonstrate", { similarity : 99, PicURL : "/img/CYX1.jpg"});
	
});

router.post('/getImage', function(request, response) {

	console.log("Request handler 'upload' was called.");
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {

        //logs the file information 
        console.log(JSON.stringify(files))

        fs.rename(files.image.path, "/Users/plutoshe/Desktop/Work/Thesis/server/faceMatch/test.jpg", function(err) {
            if (err) {
                fs.unlink("tmp/test.jpg");
                fs.rename(files.image.path, "tmp/test.jpg");
            }
        });
        // response.writeHead(200, {"Content-Type": "text/html"});
        // response.write("received image:<br/>");
        // response.write("<img src='/show' />");
        response.end();
    });

});

router.post('/refresh', multipartMiddleware, function(req, res) {
	// var detectParams = {
 //        img :
 //        mode: 'normal'
 //    }
 	
 	// console.log(req);
 	// console.log(req.files);
 	 console.log(req.files.pic);
	// var detectParams = {
 //        img : req.files.pic,
 //        mode: 'normal'
 //    };
 	var gm = require('gm');
	var fs = require('fs');
	var imageMagick = gm.subClass({ imageMagick : true });
 	console.log(req.files.pic["path"]);
 	var srcPath = path.join(req.files.pic["path"]);
 	var dstPath = path.join("/Users/plutoshe/Desktop/Work/Thesis/server/faceMatch", "2.jpg");
 	console.log(srcPath, " ", dstPath);
 	imageMagick(srcPath).resize(600, 480, '!') .autoOrient().write(dstPath, function(err) {
 		console.log("finished resize");

		var data = fs.createReadStream(path.join(dstPath));
		var detectParams = {
	   		img : data
	    };
	    if (req.files.pic["size"] > 3 * 1024 * 1024) {
	    	
	    	return
	    }
		console.log(detectParams);
		facePP.detection.detect(detectParams, function (err, faceRes) {
			// if (faceRes.face.length == 0) {
				
			// 	return
			// }
			console.log("!!!!!");
			if (err) {
				// res.send(err);
				console.log(err);
				return
			}
			// console.log(faceRes);
			if (!faceRes.face[0]["face_id"]) {
				res.end();
			}
		    var nowId = faceRes.face[0]["face_id"];
			var recoginitionParam = [{
				face_id1 : "73b5ca37fc47dc952c94f207e29d5519",
				face_id2 : nowId
			}, {
				face_id1 : "21b1a530b3eeef2a70d21e26b35d1deb",
				face_id2 : nowId
			},
			{
				face_id1 : "cfca45bc84011fa465fa6f3c14cb4a79",
				face_id2 : nowId
			}];
			
			// console.log(recoginitionParam[0]);
			console.log("!!!!");
			async.parallel([
			    function(callback) { facePP.recognition.compare(recoginitionParam[0], callback);  },
			    function(callback) { facePP.recognition.compare(recoginitionParam[1], callback);  },
			    function(callback) { facePP.recognition.compare(recoginitionParam[2], callback);  }
				], 


				function (err, results) { 
					// console.log(results);
					// if (err) {
					// 	return
					// }
					var max = results[0]["similarity"], select = 0;
					for (var i = 1; i < results.length; i++) {
						if (results[i]["similarity"] > max) {
							max = results[i]["similarity"]
							select = i;
						}
					}
					
					var url = facePP.baseUrl + '/info/get_face';
					var qsParams = {
				        api_key: facePP.api_key,
				        api_secret: facePP.api_secret,
				        face_id : recoginitionParam[select]["face_id1"]
				    };
				    // console.log(select);
				    //这是没有网络的时候的做法！ 
				    var img_url = ["/img/LDH1.jpg", "/img/LJ1.jpg", "/img/CXY1.jpg"]
				    res.render("demonstrate", { similarity : max, PicURL : img_url[select]});

				    //这是有网络的时候的做法！ 
		    		// request.get(url, {qs: qsParams}, function (err, getFaceRes) {
				    //     var x =JSON.parse(getFaceRes.body);
				    //     // console.log(x);
				    //     res.render("demonstrate", { similarity : max, PicURL : x["face_info"][0]["url"]});
				        
				    // });
			});	        

		});	
	 });
});


router.get('/compare', function(req, res) {
	var recoginitionParam = [{
		face_id1 : "44d63b11308a22ca2a397f6395e831f5",
		face_id2 : "f8d2583907d894bb955582664422968a"
	}, {
		face_id1 : "d3021a9e8cceb01649024eb65110b090",
		face_id2 : "f8d2583907d894bb955582664422968a"
	},
	{
		face_id1 : "d3021a9e8cceb01649024eb65110b090",
		face_id2 : "f44d672bcebe46fb2911e10db593af15"
	}];
	
	console.log(recoginitionParam[0]);
		
	async.parallel([
	    function(callback) { facePP.recognition.compare(recoginitionParam[0], callback);  },
	    function(callback) { facePP.recognition.compare(recoginitionParam[1], callback);  },
	    function(callback) { facePP.recognition.compare(recoginitionParam[2], callback);  }
		], 


		function (err, results) { 
			
			if (err) {
				res.send(err);
				res.end();
				return
			}
			var max = results[0]["similarity"], select = 0;
			for (var i = 1; i < results.length; i++) {
				if (results[i]["similarity"] > max) {
					max = results[i]["similarity"]
					select = 2;
				}
			}
			
			var url = facePP.baseUrl + '/info/get_face';
			var qsParams = {
		        api_key: facePP.api_key,
		        api_secret: facePP.api_secret,
		        face_id : recoginitionParam[select]["face_id2"]
		    };

    		request.get(url, {qs: qsParams}, function (err, getFaceRes) {
		        var x =JSON.parse(getFaceRes.body);
		        res.send(x);
		        res.end();
		    });
	});

		
	// console.log("!!");
});


router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/addFaceToPersonbypost', function(req, res) {

// "/Users/plutoshe/Desktop/b.jpg"
	console.log(req.body);
	console.log(req.body["path"]);
	console.log(req.body["name"]);
	var data = fs.createReadStream(path.join(req.body["path"]));
	var detectParams = {
   		img : data,
        mode: 'normal'
    };
    var personParams = {
    	person_name : req.body["name"]
    }
    console.log(detectParams);
    console.log(personParams);

    async.parallel([
	function(callback) { facePP.detection.detect(detectParams, callback); },
	function(callback) { facePP.person.create(personParams, callback); }
	],
	function (err, results) {
		if (err) console.log(err);
		console.log(results);
		// res.send(results[0]);
		
		var faceParams = {
			face_id : results[0]["face"][0]["face_id"],	
			person_id : results[1]["person_id"]
		};
		console.log(faceParams);
		facePP.person.add_face(faceParams, function(err, personRes) {
			res.send(personRes)
			res.end();	
			
		});
	});


});

router.post('/addFaceToPersonbypostandurl', function(req, res) {

// "/Users/plutoshe/Desktop/b.jpg"
	
	var detectParams = {
   		url : req.body["url"],
        mode: 'normal'
    };
    var personParams = {
    	person_name : req.body["name"]
    }
    console.log(detectParams);
    console.log(personParams);

    async.parallel([
	function(callback) { facePP.detection.detect(detectParams, callback); },
	function(callback) { facePP.person.create(personParams, callback); }
	],
	function (err, results) {
		if (err) console.log(err);
		console.log(results);
		// res.send(results[0]);
		
		var faceParams = {
			face_id : results[0]["face"][0]["face_id"],	
			person_id : results[1]["person_id"]
		};
		console.log(faceParams);
		facePP.person.add_face(faceParams, function(err, personRes) {
			res.send(personRes)
			res.end();	
			
		});
	});


});



// facePP.detection.detect(detectParams, function (err, faceRes) {
// 	    var nowId = faceRes.face[0].face_id;
// 		var recoginitionParam = {
// 			face_id1 : nowId,
// 			face_id2 : "f8d2583907d894bb955582664422968a"
// 		};
// 		facePP.recognition.compare(recoginitionParam, function(err, recogRes) {
// 			if (err) {
// 				console.log(err);
// 				res.end();
// 			}
// 			res.send(recogRes);
// 			console.log("compare finished");
// 		});		        

// 	});

router.get('/detect', function(req, res) {


	// var data = fs.createReadStream(path.join("/Users/plutoshe/Desktop/2152-1etjcob.jpg"));
	// var detectParams = {
 //   		img : data,
 //        mode: 'normal'
 //    };
	// facePP.detection.detect(detectParams, function (err, faceRes) {
	//     var nowId = faceRes.face[0].face_id;
	// 	var recoginitionParam = {
	// 		face_id1 : nowId,
	// 		face_id2 : "f8d2583907d894bb955582664422968a"
	// 	};
	// 	facePP.recognition.compare(recoginitionParam, function(err, recogRes) {
	// 		if (err) {
	// 			console.log(err);
	// 			res.end();
	// 		}
	// 		res.send(recogRes);
	// 		console.log("compare finished");
	// 	});		        

	// });	


	// fs.readFile('/Users/plutoshe/Desktop/b.jpg', function(err, data) {
	 	var url = facePP.baseUrl + '/detection/detect';



	// var img = new Buffer(filePath.data, 'binary').toString('base64');
		// if (err) throw err;
		// var detectParams = {
	        
	 //        mode: 'normal'
	 //    };


		// facePP.detection.detect(detectParams, function (err, faceRes) {
	 //        // to do something 
	        
	 //        console.log("!!")
	 //        console.log(faceRes)
	 //        // res.send(faceRes)

	 //    });

	    // var qsParams = {
	    //         api_key: facePP.api_key,
	    //         api_secret: facePP.api_secret,
	    //         mode : "normal",
	    //         img : data
	    //     };

	    // qsParams = _.extend(qsParams, detectParams);

	    // request.post(url, {qs: qsParams}, requestCallback);
	    var r = request.post(url, requestCallback)
		var form = r.form();
		// console.log(data);
		form.append("api_key", facePP.api_key);
		form.append("api_secret", facePP.api_secret);
		form.append("img", fs.createReadStream(path.join("/Users/plutoshe/Desktop/3.jpg")));
		form.append("mode", "oneface");
	    // form = r.form();
	    // form.append("img", data);

	    function requestCallback(err, res) {
	        if (err) {
	            throw new Error('send request error %s', err);
	        }
	        console.log(res.body);
	    }



	// });

	// fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
	    
	    
	// 	var detectParams = {
	//         img : data,
	//         mode: 'normal'
	//     };
	// 	facePP.detection.detect(detectParams, function (err, faceRes) {
	//         // to do something 
	        
	//         console.log("!!")
	//         console.log(faceRes)
	//         res.send(faceRes)

	//     });
	// });


});

router.get('/upload', function(req, res) {
	res.render('uploadPic.html');
});



router.get('/addFaceToPerson', function(req, res) {	
	var faceParams = {
		face_id : "4236f95a2357edd2bda65ea8d798c56f",
		// person_id : "a9867b9bb07d516579d185ad646219eb"
		person_name : "BingbingFan"
	};
	facePP.person.add_face(faceParams, function(err, personRes) {
		res.send(personRes);
		res.end();
		
	});

	
    
});

router.get('/getGroupInfo', function(req, res) {
	var groupParams = {
		group_name : "Stars"
	};
	var ww="3333"
	facePP.group.get_info(groupParams, function (err, groupRes) {
		res.send(groupRes);
		res.end()
	});
});

router.post('/getPersonInfo', function(req, res) {
	var personParams = {
		person_id : req.body["person_id"]
	};
	facePP.person.get_info(personParams, function(err, personRes) {
		res.send(personRes);
		res.end()
	});
});

router.post('/createPerson', function(req, res) {
	var personParams = {
		person_name : req.body["name"]
	};
	facePP.person.create(personParams, function (err, personRes) {
		res.send(personRes)
	});

});

router.get('/addPersonToGroup', function(req,res) {
	var addParams = {
		group_name : "Stars",
		person_name : "BingbingFan"
	}
	facePP.group.add_person(addParams, function (err, groupRes) {
		res.send(groupRes)
	});
	
});


router.get('/createGroup', function(req, res) {
	var groupParams = {
		group_name : "Stars"
	};
	facePP.group.create(groupParams, function (err, groupRes) {
		res.send(groupRes)
	});
});

router.get('/getGroupList', function(req, res) {
	facePP.info.get_group_list(function (err, groupRes) {
		res.send(groupRes);
	});
});

router.get('/getPersonList', function(req, res) {
	facePP.info.get_person_list(function (err, groupRes) {
		res.send(groupRes);
	});
});

//delete phase
router.get('/deletePerson', function(req, res) {
	var personParams = {
		person_name : ""
	};
	facePP.person.delete(personParams, function(err, personRes) {
		res.send(personRes);
	});
});

router.get('/deletePerson', function(req, res) {
	var personParams = {
		person_name : ""
	};
	facePP.person.delete(personParams, function(err, personRes) {
		res.send(personRes);
	});
});

router.get('/removePersonFromGroup', function(req, res) {
	var personParams = {
		person_name : ""
	};
	facePP.person.delete(personParams, function(err, personRes) {
		res.send(personRes);
	});
});

module.exports = router;
