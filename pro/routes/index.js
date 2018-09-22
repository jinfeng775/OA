var express = require('express');
var router = express.Router();
var mongodb=require('mongodb').MongoClient;
var ObjectId=require('mongodb').ObjectId;
var db_str="mongodb://localhost:27017/test";
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { name: req.session.name });
});



router.get('/page-login',(req,res)=>{
	res.render('page-login',{})
})
module.exports = router;
