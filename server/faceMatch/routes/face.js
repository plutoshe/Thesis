var facePP = require('faceppsdk'),
    verifyParams = {
        person_id : 'person_id'
    };

var router = express.Router();
var models = require('../models/comment');
var faceModel = models.face;
// var overallModel = models.overall;

router.post("/getRecentFace", function(req, res) {
	var q = faceModel.find().sort({'updateTime': 1}).limit(20);
	q.exec(function(err, data) {
			if (err) return console.error(err);

	  		res.send(data);
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
	var newFace = new faceModel({location : req.body.location, updateTime: new Date(), content : req.body.content, gender : req.body.gender, faceID : req.body.faceID});
	newFace.save();
	res.end();
});

module.exports = router;