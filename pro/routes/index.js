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
			//			每页显示数量
			var pageNo=req.query.pageNo;
			pageNo=pageNo?pageNo:1;
			var size=3;
//			总数量
			var count=0;
//			总页数
			var page=0;
//			coll.find({}).sort({
//				_id: -1
//			}).toArray((err, data) => {
//				res.render('index', {
//					name: req.session.name,
//					data:data,
//					xingming:req.session.xingming			});
////				console.log(data)
//				database.close()
//			})
		
				async.series([
				function(callback){
					coll.find({}).toArray((err,data)=>{
						
						count=data.length;
						page=Math.ceil(count/size) 
//						下一页
						pageNo=pageNo>=page?page:pageNo;
//						上一页
						pageNo=pageNo<=1?1:pageNo
						
					})
					
					callback(null,'')
				},
				function(callback){
					coll.find({}).sort({_id:-1}).limit(size).skip((pageNo-1)*size).toArray((err,data)=>{
						callback(null,data)
					})	
				}
			],function(err,data){
					res.render('index', {
					name: req.session.name,
					data:data[1],pageNo:pageNo,page:page,count:count
								});
					
//				res.render('boke',{data:data[1],pageNo:pageNo,page:page,count:count})
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