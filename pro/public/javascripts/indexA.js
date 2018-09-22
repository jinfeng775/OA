$(function(){

	//提交按钮
	$("#tijiao").click(function(){
		var xingbie ="";
		$("#nanx").prop("checked") ? xingbie = "男" :xingbie = "女" ;
		if($("#xuehao").val()!=""&&$("#name").val()!=""&&$("#banji").val()!=""&&$("#nianling").val()!=""){
			
		
		$.ajax({
				type: "post",
				url: "/users/yewu",
				data: {
					name:$("#xuehao").val(),
					mima:"123456",
					xingming:$("#name").val(),
					banji:$("#banji").val(),
					nianling:$("#nianling").val(),
					xingbie:xingbie,
					ip:"1"
				},
				success: function(data) {
				console.log(data)
				
					if(data == 1) {
						alert('注册成功')
						location.href = '/'
					} else {
						alert('注册失败')
					}
				}
			});
		}else{
			alert("请全部填写")
		}
	})
	
//	全选
	$("#quanxuan").click(function(){
	$(".danxuans").prop("checked",$(this).prop("checked"));	
	})
	
//	删除
	$("#shanchu").click(function(){
		var obj={}
	
		var promise1 = new Promise(function(resolve, reject) {
		$(".danxuans").each(function(i,item){
					if($(item).prop("checked")){
						obj[i]=$(item).attr("data-id");
						$(item).parentsUntil("tbody").eq($(item).parentsUntil("tbody").size()-1).remove()
					}
				});
		
		 resolve();
		
		});
		
promise1.then(function() { 
	obj = JSON.stringify(obj)
$.ajax({
	
				type: "post",
				url: "/users/yewu",
				data: {
					shu:obj,
					ip:"2"
				},
				success: function(data) {
				console.log(data)
				
					if(data == 1) {
						alert('成功')
						
					} else {
						alert('失败')
					}
				}
			});
});
		
	})
// 查询
$("#chaxun").click(function(){
	var cha  =	$(this).parent().prev().val();
	$.ajax({
				type: "post",
				url: "/users/yewu",
				data: {
					shu:cha,
					ip:"3"
				},
				success: function(data) {
				console.log(data)
				
					if(data == 1) {
						alert('成功')
						
					} else {
						alert('失败')
					}
				}
			});
})
	
	
	
})
