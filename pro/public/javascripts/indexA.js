$(function() {

	//提交按钮
	$("#tijiao").click(function() {
		var xingbie = "";
		$("#nanx").prop("checked") ? xingbie = "男" : xingbie = "女";
		if($("#xuehao").val() != "" && $("#name").val() != "" && $("#banji").val() != "" && $("#nianling").val() != "") {

			$.ajax({
				type: "post",
				url: "/users/yewu",
				data: {
					name: $("#xuehao").val(),
					mima: "123456",
					xingming: $("#name").val(),
					banji: $("#banji").val(),
					nianling: $("#nianling").val(),
					xingbie: xingbie,
					ip: "1"
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
		} else {
			alert("请全部填写")
		}
	})

	//	全选
	$("#quanxuan").click(function() {
		$(".danxuans").prop("checked", $(this).prop("checked"));
	})

	//	查询全选
	$("#quanxuanC").click(function() {
		$("#chaxunconte .danxuans").prop("checked", $(this).prop("checked"));
	})
	//查询
	
	$("#close").click(function() {
		$("#cxbao").hide()
	})
	//	删除
	$(".shanchu").click(function() {
		var obj = {}

		var promise1 = new Promise(function(resolve, reject) {
			$(".danxuans").each(function(i, item) {
				if($(item).prop("checked")) {
					obj[i] = $(item).attr("data-id");
					$(item).parentsUntil("tbody").eq($(item).parentsUntil("tbody").size() - 1).remove()
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
					shu: obj,
					ip: "2"
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
	$("#chaxun").click(function() {
		var cha = $(this).parent().prev().val();
		if(cha!=""){
			
	
		$.ajax({
			type: "post",
			url: "/users/yewu",
			data: {
				shu: cha,
				ip: "3"
			},
			success: function(data) {

				if(data == 2) {
					alert('shibai')

				} else {
					var bodystr = "";
					var body = $("#chaxunconte")
					data.map((item, i) => {
						bodystr += `<tr>
												<td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"><label class="fancy-checkbox">
										<input class="danxuans" type="checkbox" data-id="${data[i].name}">
										<span><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"></font></font></span>
									</label></font></font></td>
												<td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${data[i].name}</font></font></td>
												<td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${data[i].xingming}</font></font></td>
												<td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${data[i].banji}</font></font></td>
												<td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${data[i].xingbie}</font></font></td>
												<td><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${data[i].nianling}</font></font></td>
												
											</tr>
						`

					})

				}
				body.html(bodystr)
			}
		});
		$("#cxbao").show()
		}else{
		alert("请输入查询条件")
	}
	})


//点击事件
var tdid="";
var	bt="";
var btv="";

$("#tbodaa").on("click","font",function(e){
	 tdid = $(e.target).parentsUntil("tbody").eq($(e.target).parentsUntil("tbody").size() - 1).attr("data-id")
	 bt = $(e.target).attr("data-bt");
	 btv = e.target.innerHTML;
	$(".xiu").show()
	$("#xginput").val(e.target.innerHTML).attr("placeholder",e.target.innerHTML)
	//获取局部变量tdid
	
	
})
$("#quxiaox").click(function(){
	$(".xiu").hide()
})
$("#xiugaix").click(function(){
		//请求服务器
		$.ajax({

				type: "post",
				url: "/users/yewu",
				data: {
					
					shuid:tdid,
					shu: bt,
					shuvul:btv,
					shunew:$("#xginput").val(),
					ip: "4"
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





//修改密码
$("#xgmmipt").blur(function(){
	
	console.log($("#xgmmipt").val())
})
$("#xgmm").click(function(){
	
})




//结尾
})