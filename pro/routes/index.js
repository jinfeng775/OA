var express = require('express');
var router = express.Router();
var async=require('async');
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var db_str = "mongodb://localhost:27017/test";
/* GET home page. */
router.get('/', function(req, res, next) {
	mongodb.connect(db_str, (err, database) => {
		database.collection('users', (err, coll) => {
			coll.find({}).sort({
				_id: -1
			}).toArray((err, data) => {
				res.render('index', {
					name: req.session.name,
					data:data
				});
//				console.log(data)
				database.close()
			})

		})
	})
});

router.get('/page-login', (req, res) => {
	res.render('page-login', {})
})
module.exports = router;