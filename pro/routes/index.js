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
					data:data,
					xingming:req.session.xingming			});
//				console.log(data)
				database.close()
			})

		})
	})
});
//退出
router.get('/relogin',(req,res)=>{
	req.session.destroy((err)=>{
		if(err){
			console.log(err)
		}else{
			res.redirect('/')
		}
	})
})
router.get('/page-login', (req, res) => {
	res.render('page-login', {})
})
router.get('/xgmima', (req, res) => {
	res.render('xgmima', {name: req.session.name,mima:req.session.mima})
})
router.get('/geren', (req, res) => {
	res.render('geren', {name: req.session.name,
		data:req.session.data,
		xingming:req.session.xingming		
					})
})

module.exports = router;