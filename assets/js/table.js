
	$("form").each(function(index,ele){
		$(ele).validate({
			onfocusout: function(element){
				$(element).valid();
			}
		})
	});
	var tab_config = $.extend(true, {}, GLOBAL_CONFIG.defaultTable);
	tab_config.url = GLOBAL_CONFIG.apiFull.test;
	tab_config.toolbar = "#toolbar";
	tab_config.onLoadSuccess = function(data){    
		// console.log(data)
	}
	tab_config.onClickRow = function(row,$element){
		if(!$($element).hasClass('selected')){
			$($element).siblings().removeClass('selected');
			$($element).addClass('selected');
		}else{
			$($element).removeClass('selected');
		}
	}
	tab_config.queryParams = function (params) {
			var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
				limit: params.limit,   //页面大小
				offset: params.offset,  //页码
				name: $("#txt-search-name").val(),
			};
			return temp;
		}
	tab_config.columns = [
		{
			checkbox: false
		},
		{
			field: 'Name',
			sortable: true,// 排序
			title: '名称',
			align: 'center'
		}, {
			field: 'ParentName',
			title: '上级名称',
			align: 'center'
		}, {
			field: 'Level',
			title: '级别',
			align: 'center'
		}, {
			field: 'Desc',
			title: '描述',
			align: 'center'
		}, {
			field:'action',
			title:'操作',
			align: 'center',
			formatter:function(value,row,index){
				return '<a href="javascript:;" onclick="editData(\''+ index + '\')">修改</a> '+
						'<a href="javascript:;" onclick="deleteData(\''+ row.id + '\')">删除</a> ';
				  }
		}];
	$('#tb-list').bootstrapTable(tab_config);
	
	// 查询
	$('#btn-query').on('click',function () {
		var pageSize=$('#tb-list').bootstrapTable('getOptions').pageSize;//通过表的#id 可以得到每页多少条
		var pageNumber=$('#tb-list').bootstrapTable('getOptions').pageNumber;//通过表的#id 可以得到当前第几页
		
		$.ajax({
			type:"POST",
			url:tab_config.url,
			dataType:'json',
			data:{
				offset: pageNumber,      //页码
				limit: pageSize,        //每页条数
				name: $("#txt-search-name").val() || null,
			},
			success:function (res) {
				var data = res;
				if (data.total === 0) {
					data.total = 1;
				}
				$('#tb-list').bootstrapTable('load', data);
			}
		})
    });
	// 下拉菜单搜索绑定
	$('#my-modal-edit select[name="input-pname"]').select2({
		placeholder: 'Ajax后端获取数据示例',
		width: '100%',
		ajax: {
		  url: GLOBAL_CONFIG.apiFull.test,
		  dataType: 'json',
		  delay: 250,
		  data: function (params) {
			  var query = {
				search: params.term,
			  }
			return query;
		  },
		  processResults: function (data) {
			var formatData = [];
			data.rows.map(function(item){
				formatData.push({text:item.type,id:item.account})
			})
			return {
			  results: formatData
			};
		  },
		  cache: true
		}
	});
	var data = [
		{id:"001001",text:"name001"},
		{id:"001002",text:"name002"},
		{id:"001003",text:"name003"},
		{id:"001004",text:"name004"},
		{id:"001005",text:"name005"},
		{id:"001006",text:"name006"},
		{id:"001007",text:"name007"},
		{id:"001008",text:"name008"},
		{id:"001009",text:"name009"},
		{id:"001010",text:"name010"},
	]
	$('#my-modal-edit select[name="input-pname"]').select2({width: "100%", data: data});
	// 新增初始化
	$('button[data-target="#my-modal-edit"]').on('click',function () {
		$('#my-modal-edit-label').text("新增信息")
		$('#my-modal-edit input[name="input-id"]').val("")
		$('#my-modal-edit input[name="input-name"]').val("")
		// $('#my-modal-edit input[name="input-pname"]').val("")
		$('#my-modal-edit select[name="input-pname"]').select2("val", " ");
		$('#my-modal-edit input[name="input-level"]').val("")
		$('#my-modal-edit textarea[name="input-desc"]').val("")
		$('#my-modal-edit textarea[name="input-desc"]').text("")
		$("#my-modal-edit label.error").each(function(index,ele){$(ele).html("").css("display","none")})
    });
	// 编辑初始化
	function editData(index){
		var data = $('#tb-list').bootstrapTable('getData')[index]
		$('#my-modal-edit-label').text("修改信息")
		$('#my-modal-edit input[name="input-id"]').val(data.id)
		$('#my-modal-edit input[name="input-name"]').val(data.Name)
		// $('#my-modal-edit input[name="input-pname"]').val(data.ParentName)
		$('#my-modal-edit select[name="input-pname"]').html("<option value='"+data.id+"'>"+data.name+"</option>").trigger('change')
		$('#my-modal-edit input[name="input-level"]').val(data.Level)
		$('#my-modal-edit textarea[name="input-describe"]').val(data.Desc)
		$('#my-modal-edit textarea[name="input-describe"]').text(data.Desc)
		$("#my-modal-edit label.error").each(function(index,ele){$(ele).html("").css("display","none")})
		$('#my-modal-edit').modal("show")
	}
	$('#save-data').on('click',function () {
		var valid = true;
		$("form").eq(1).validate().form()
		$("#my-modal-edit label.error").each(function(index,ele){if($(ele).html())valid=false;})
		if(valid){
			$.ajax({
				type:"POST",
				url:GLOBAL_CONFIG.apiFull.companyEdit,
				dataType:'json',
				data:GLOBAL_FUNCTION.formatFormData("#my-modal-edit form"),
				success:function (res) {
					var data = res;
					if (200==data.code) {
						$('#my-modal-edit').modal("hide")
						GLOBAL_FUNCTION.showTips("success","提交成功！");
						$('#tb-list').bootstrapTable('refresh');
					}else{
						GLOBAL_FUNCTION.showTips("danger","提交失败！")
					}
				}
			})
		}
	});
	
	function deleteData(id){
		var id = parseInt(id);
		if(id){
			GLOBAL_FUNCTION.showConfirm("确定要删除选中数据吗？",function(){
				$.ajax({
					type:"POST",
					url:GLOBAL_CONFIG.apiFull.companyDelete,
					dataType:'json',
					data:{
						id: id,      //页码
					},
					success:function (res) {
						var data = res;
						if (200==data.code) {
							GLOBAL_FUNCTION.showTips("success","删除成功！");
							$('#tb-list').bootstrapTable('refresh');
						}else{
							GLOBAL_FUNCTION.showTips("danger","删除失败！")
						}
					}
				})
			})
		}
	}