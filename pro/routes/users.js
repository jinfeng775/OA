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


shujuku(req.body,function(err,data){
	console.log(1111)
		if(data.length>0){
							console.log(data[0].name)
							req.session.name = data[0].name;
					res.send('1')
				}else{
					res.send('2')
				}
				
				
})

})




//业务主逻辑
router.post('/yewu',(req,res)=>{
	//添加账号
	if(req.body.ip==1){
		
			mongodb.connect(db_str,(err,database)=>{
		database.collection('users',(err,coll)=>{
coll.find({name:req.body.name}).toArray((err,data)=>{
				if(data.length>0){
					res.send('2')
				}else{
					coll.save(req.body,()=>{
						res.send('1')
					})
				}
				database.close()
			})
		})
	})	

	}
//删除
if(req.body.ip==2){
	
	var shuju = JSON.parse(req.body.shu)
		mongodb.connect(db_str,(err,database)=>{
		database.collection('users',(err,coll)=>{
			for(var i in shuju){
				coll.deleteMany({name:shuju[i]})
			}
			database.close()
				})
		})
}




})



function shujuku(con,callback){
	
		mongodb.connect(db_str,(err,database)=>{
		database.collection('users',(err,coll)=>{
			coll.find(con).toArray((err,data)=>{
				callback(err,data);
			  database.close()
		})
	})
		})
}



module.exports = router;
