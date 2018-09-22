var express = require('express');
var mongodb=require('mongodb').MongoClient;
var db_str="mongodb://localhost:27017/test";
var ObjectId=require('mongodb').ObjectId;
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//登陆
router.post('/page-login',(req,res)=>{
	console.log(req.body)
//	req.body
	mongodb.connect(db_str,(err,database)=>{
		database.collection('users',(err,coll)=>{
			coll.find(req.body).toArray((err,data)=>{
				if(data.length>0){
							console.log(data[0].name)
							req.session.name = data[0].name;
					res.send('1')
				}else{
					res.send('2')
				}
				
				database.close()
			})
		})
	})



})




module.exports = router;
