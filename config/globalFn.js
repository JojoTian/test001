
var GLOBAL_FUNCTION = {
	showConfirm: function(msg,callback){
		if ($("#my-modal-confirm").length > 0) {
			$("#my-modal-confirm").remove();
		} 
		var html = '<div class="modal fade" id="my-modal-confirm" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">' +
						'<div class="modal-dialog" style="z-index:2901; margin-top:60px; width:400px; ">' +
							'<div class="modal-content">' +
								'<div class="modal-header" style="font-size:16px; ">' +
									'<span class="glyphicon glyphicon-envelope">&nbsp;</span>信息确认！' +
									'<button type="button" class="close" data-dismiss="modal">' +
									'<span style="font-size:20px;  " class="glyphicon glyphicon-remove"></span><tton></tton></button>' +
								'</div>' +
								'<div class="modal-body text-center" style="font-size:18px; ">是否确定继续操作？</div>' +
								'<div class="modal-footer">' +
									'<button class="btn btn-danger">确定<tton></tton></button>' +
									'<button class="btn btn-info" data-dismiss="modal">取消<tton></tton></button>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>';
		$("body").append(html);
		$("#my-modal-confirm .modal-body").text(msg);
		$("#my-modal-confirm").modal("show");
		$("#my-modal-confirm .btn-danger").click(function(){
			$("#my-modal-confirm").modal("hide");
			callback();
			setTimeout(function(){$("#my-modal-confirm").remove();},500);
		});
		$("#my-modal-confirm .btn-info").click(function(){
			$("#my-modal-confirm").modal("hide");
			setTimeout(function(){$("#my-modal-confirm").remove();},500);
		});
	},
	showTips: function(type,msg){
		var type_list = ["success","info","warning","danger"],
			ele = ".alert.alert-info",
			msg = msg || null
			times = 1500;
		if(type_list.includes(type)){
			ele = ".alert.alert-"+type;
		}
		$(ele).find("strong").text(msg);
		$(ele).removeClass("hide").addClass("show");
		$(ele).css("left","calc(100% - "+$(ele).width()+") / 2")
		setTimeout(function(){
			$(ele).addClass("hide").removeClass("show");
		},times)
	},
	getUrlParam: function(url){
		var params = url?url.split("?"):[],obj = {}
		if(params[1]){
			var match_result = params[1].match(/[^?&](.*?)=(.*?)[^&|#|$]/g);
			if(match_result){
				match_result.forEach(function(item){
					var arr = item.split("=");
					obj[arr[0]]=arr[1];
				})
			}
		}
		return obj;
	}, 
	//校验手机号
	checkPhone: function(id){
		if(!id)id="phone";   //360中  在方法中赋初值  报错
		return checkField(id,/^1[3456789]\d{9}$/);
	},
	//验证用户名  用户名2-4个
	checkUname: function(id){
		if(!id)id="uname";    
		return checkField(id,/^[\u4e00-\u9fa5]{2,4}$/);
	},
	//验证密码   密码要求6-8位，首位为字母，后面5-7位是数字
	checkPwd: function(id){
		if(!id)id="pwd";    
		return checkField(id,/^[a-z]\w{5,7}$/);
	},
	getBankType: function(){
		$.ajax({
			type:"POST",
			url:GLOBAL_CONFIG.apiFull.bankType,
			dataType:'json',
			data:{
				token: "sdfsdfsdf",      //页码
			},
			success:function (res) {
				var data = res;
				if (data.rows.length) {
					var bank_type = [];
					data.rows.map(function(item){
						bank_type.push({text:item.type,id:item.account})
					})
					SYS_CONFIG.bankType = bank_type
				}
			}
		})
	},
	getOptionForBankType: function(){
		var html = ""
		SYS_CONFIG.bankType.map(function(item){
			html += "<option value='" + item.id + "'>" + item.text + "</option>"
		})
		return html;
	},
	formatFormData: function(eleForm){
		var arr = $(eleForm).serializeArray(),
			obj = {};
		arr.map(function(item){
			obj[item.name] = item.value;
		})
		return obj;
	},
} 
//封装校验：相同的保留，不同的传参
function checkField(id,reg){
	//获取用户输入的数据 
	  var inputVal=$('#'+id).val();   
	//获取对应label值
	  var inputLabel=$('#'+id).parent().prev().html().substr(0,$('#'+id).parent().prev().html().length-1);  
	//获取span错误时描述对象
	  var span=$('#'+id+"Span"); 
	//开始校验
	  if(inputVal==""|| inputVal==null){
	  //输入校验结果
		span.html("*"+inputLabel+"不能为空"); 
		span.css("color","red"); 
		return false;
	  }//else if(reg && !reg.test(inputVal)){
	  //输入校验结果    -----------------------------校验规则待定
		// span.html("*"+inputLabel+"格式不符");  
		// span.css("color","red"); 
	  //   span.html(" ");  
	  //   span.css("color","green"); 
	  //   return false;
	  // }
	  else{
		span.html(" ");  
		span.css("color","green"); 
		return true;
	  }
  }