$(function(){
	$("#tijiao").click(function(){
		var xingbie ="";
		$("#nanx").prop("checked") ? xingbie = "男" :xingbie = "女" ;
//		console.log($("#xuehao").val())
//		console.log($("#name").val())
//		console.log($("#banji").val())
//		console.log($("#nianling").val())
		console.log(xingbie)
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
	
})
