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
	//修改个人资料
	$("#tijiaoa").click(function() {
		console.log(123)
		var xingbie = "";
		$("#nanx").prop("checked") ? xingbie = "男" : xingbie = "女";
		if($("#xuehao").val() != "" && $("#name").val() != "" && $("#banji").val() != "" && $("#nianling").val() != "") {

			$.ajax({
				type: "post",
				url: "/users/yewu",
				data: {
					name: $("#xuehao").val(),
					xingming: $("#name").val(),
					banji: $("#banji").val(),
					nianling: $("#nianling").val(),
					xingbie: xingbie,
					ip: "6"
				},
				success: function(data) {
					console.log(data)

					if(data == 1) {
						alert('修改成功！')
						$("#zhezhaobaoG").hide()
						$(".listul").eq(0).html($("#xuehao").val())
						$(".listul").eq(1).html($("#name").val())
						$(".listul").eq(2).html($("#banji").val())
						$(".listul").eq(3).html($("#nianling").val())
						$("#nanx").prop("checked")? $(".listul").eq(4).html("男"):$(".listul").eq(4).html("女")
						
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
		$(".chaxunconte .danxuans").prop("checked", $(this).prop("checked"));
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
					var body = $(".chaxunconte")
					data.map((item, i) => {
						bodystr += `<tr data-id="${data[i].name}">
												<td><label class="fancy-checkbox">
										<input class="danxuans" type="checkbox" data-id="${data[i].name}">
										<span></span>
									</label></td>
												<td><font style="vertical-align: inherit;" data-bt="name">${data[i].name}</font></td>
												<td><font style="vertical-align: inherit;"data-bt="xingming">${data[i].xingming}</font></td>
												<td><font style="vertical-align: inherit;"data-bt="banji">${data[i].banji}</font></td>
												<td><font style="vertical-align: inherit;"data-bt="xingbie">${data[i].xingbie}</font></td>
												<td><font style="vertical-align: inherit;"data-bt="nianling">${data[i].nianling}</font></td>
												
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

$(".tbodaa").on("click","font",function(e){
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
						location.href="/"

					} else {
						alert('失败')
					}
				}
			});
	})



var yzmm = false;
$("#xgmm").fadeOut()
//修改密码
$("#xgmmipt").blur(function(){
	
	console.log($("#xgmmipt").val())
	$.ajax({

				type: "post",
				url: "/users/yewu",
				data: {
					mz:$("#idname").html(),
					shu:$("#xgmmipt").val(),
					ip: "5"
				},
				success: function(data) {

					if(data == 1) {
						yzmm = true;
						$("#xgmmipt").css("border","1px solid #00FF00")

					} else {
						yzmm = false;
							$("#xgmmipt").css("border","1px solid red")
					}
				}
			});
})
//新密码正则验证
$("#xginput1").blur(function(){
	   var reg = new RegExp("^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$");    
	
	 if(!reg.test($(this).val())){    
	 	$(this).css("border","1px solid red")
    }else{
    $(this).css("border","1px solid #00FF00")	
    }
})
$("#xginput2").blur(function(){
	if($("#xginput1").val()==$(this).val()&&$(this).val().length>5){
	$(this).css("border","1px solid #00FF00")
	
	if(yzmm){
		$("#xgmm").fadeIn()
		$("#xgmm").click(fo)
	}
	}else{
		$("#xgmm").unbind("click",fo);
		$(this).css("border","1px solid red")
	}
})
//发送修改请求函数事件
function fo(){
	

	$.ajax({
				type: "post",
				url: "/users/yewu",
				data: {						
					shuid:$("#idname").html(),
					shu: "mima",					
					shunew:$("#xginput2").val(),
					ip: "4"				
				},
				success: function(data) {

					if(data == 1) {
						alert("修改成功")
						location.href="/page-login"
					} else {
					}
				}
			});
}


//编辑修改个人资料
$("#bjxiugai").click(function(){
	$("#zhezhaobaoG").show()
	$("#xuehao").val($(".listul").eq(0).html())
	$("#name").val($(".listul").eq(1).html())
	$("#banji").val($(".listul").eq(2).html())
	$("#nianling").val($(".listul").eq(3).html())
	console.log($(".listul").eq(4).html())
	if($(".listul").eq(4).html()=="男"){
		$("#nanx").prop("checked",true)
	}else{
		$("#nany").prop("checked",true)
	}
	
})


//结尾
})