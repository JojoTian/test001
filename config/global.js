
var GLOBAL_CONFIG = {
	//全局接口URL配置
	apiHost: "http://192.168.10.186:8000",
	api: {
		login: "/login",
		logout: "/logout",
	},
	apiFull: {
		test: "http://192.168.10.186:8000/api/test/returntab",
		login: "http://192.168.10.186:8000/api/test/login",
		logout: "http://192.168.10.186:8000/api/test/logout",
		roleList: "http://192.168.10.186:8000/api/test/role/list",
		setUserRole: "http://192.168.10.186:8000/api/test/user/edit",
		userLocked: "http://192.168.10.186:8000/api/test/user/edit",
		userUnLock: "http://192.168.10.186:8000/api/test/user/edit",
		userUsing: "http://192.168.10.186:8000/api/user/edit",
		userDelete: "http://192.168.10.186:8000/api/test/delete",
		userList: "http://192.168.10.186:8000/api/test/user/list",
		userEdit: "http://192.168.10.186:8000/api/test/user/edit",
		companySelect: "http://192.168.10.186:8000/api/test/company/list",
		companyList: "http://192.168.10.186:8000/api/test/company/list",
		companyEdit: "http://192.168.10.186:8000/api/test/company/edit",
		companyDelete: "http://192.168.10.186:8000/api/test/delete",
	},
	//全局路由配置
	route: {
		navbar: {url: "./includes/navbar.html", data: {}},
		sidebar: {url: "./includes/sidebar.html", data: {}},
		table: {url: "./includes/table.html", data: {}},
		echart: {url: "./includes/echarts.html", data: {}},
		uploadfile: {url: "./includes/uploadfile.html", data: {}},
		login: {url: "./login.html", data: {}},
		logout: {url: "./logout.html", data: {}},
		main: {url: "./includes/table.html", data: {}},
		company: {url: "./includes/company.html", data: {}},
		project: {url: "./includes/main.html", data: {}},
		user: {url: "./includes/user.html", data: {}},
		role: {url: "./includes/company.html", data: {}},
		authority: {url: "./includes/echarts.html", data: {}},
		sysLog: {url: "./includes/uploadfile.html", data: {}},
		sysMonitor: {url: "./includes/main.html", data: {}},
		sysSetting: {url: "./includes/main.html", data: {}},
		codeSetting: {url: "./includes/main.html", data: {}},
	},
	//通用对象配置
	defaultTable:{
		url:"",
		contentType: "application/x-www-form-urlencoded",/**支持跨域**/
		method: "get",                      //请求方式（*）
		// toolbar: "#toolbar",                //工具按钮用哪个容器
		striped: true,                      //是否显示行间隔色
		cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination: true,                   //是否显示分页（*）
		sortable: true,                     //是否启用排序
		sortOrder: "asc",                   //排序方式
		queryParams: function (params) {
			var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
				limit: params.limit,   //页面大小
				offset: params.offset,  //页码
			};
			return temp;
		},//传递参数（*）
		sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
		pageNumber:1,                       //初始化加载第一页，默认第一页
		pageSize: 10,                       //每页的记录行数（*）
		pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
		paginationPreText: "上一页",                   //
		paginationNextText: "下一页",                   //
		paginationFirstText: "第一页",                   //
		paginationLastText: "最后一页",                   //
		search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
		strictSearch: true,
		showColumns: false,                  //是否显示所有的列
		showRefresh: false,                  //是否显示刷新按钮
		minimumCountColumns: 2,             //最少允许的列数
		checkboxHeader: true,
		singleSelect: true,
		clickToSelect: true,                //是否启用点击选中行
		//height: 500,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
		uniqueId: "id",                     //每一行的唯一标识，一般为主键列
		showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
		cardView: false,                    //是否显示详细视图
		detailView: false,                   //是否显示父子表
		theadClasses: "thead-gray",	//这里设置表头样式
		classes: "table table-striped table-condensed table-hover",
		rowStyles: function(row, index) {
			return { css:{border:"none","border-bottom":"1px solid red"}}
		},
		onClickRow:function(row,$element){
			if(!$($element).hasClass('selected')){
				$($element).siblings().removeClass('selected');
				$($element).addClass('selected');
			}else{
				$($element).removeClass('selected');
			}
		},
		columns: []
	},
	defaultUpload:{
		theme: 'explorer-fas',
		language: "zh", //设置语言
		uploadUrl: "", //上传的地址
		deleteUrl: "", //上传的地址
		allowedFileExtensions: [],//接收的文件后缀
		uploadExtraData:{"id": 1, "fileName":'test.jpg'}, //额外提交参数
		elErrorContainer: '#err-info',
		uploadAsync: true, //默认异步上传
		showUpload: true, //是否显示上传按钮
		showRemove : true, //显示移除按钮
		showPreview : true, //是否显示预览
		showCaption: true,//是否显示标题
		browseClass: "btn btn-primary", //按钮样式
		fileActionSettings: {
			showRemove: true,
			showUpload: false,
			showZoom: false,
			showDrag: true,
			removeIcon: '<i class="glyphicon glyphicon-trash text-danger"></i>',
			uploadIcon: '<i class="glyphicon glyphicon-upload text-info"></i>',
			dragIcon: '<i class="glyphicon glyphicon-menu-hamburger"></i>',
			zoomIcon: '<i class="glyphicon glyphicon-zoom-in"></i>',
		},
		//minImageWidth: 50, //图片的最小宽度
		//minImageHeight: 50,//图片的最小高度
		//maxImageWidth: 1000,//图片的最大宽度
		//maxImageHeight: 1000,//图片的最大高度
		//maxFileSize: 0,//单位为kb，如果为0表示不限制文件大小
		//maxFileCount: 2, //表示允许同时上传的最大文件个数
		enctype: "multipart/form-data",
		validateInitialCount:true,
		msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
		initialPreviewAsData: true, //已经上传的数据显示
		initialPreview: [],
		initialPreviewConfig: []
	},
	niceScroll: {
        cursorcolor: "#ccc", // 改变滚动条颜色，使用16进制颜色值
        cursoropacitymin: 0, // 当滚动条是隐藏状态时改变透明度, 值范围 1 到 0
        cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
        cursorwidth: "5px", // 滚动条的宽度，单位：便素
        cursorborder: "1px solid #fff", // CSS方式定义滚动条边框
        cursorborderradius: "5px", // 滚动条圆角（像素）
        zindex: "auto",// | <number>, // 改变滚动条的DIV的z-index值
        scrollspeed: 60, // 滚动速度
        mousescrollstep: 40, // 鼠标滚轮的滚动速度 (像素)
        touchbehavior: false, // 激活拖拽滚动
        hwacceleration: true, // 激活硬件加速
        boxzoom: false, // 激活放大box的内容
        dblclickzoom: true, // (仅当 boxzoom=true时有效)双击box时放大
        gesturezoom: true, // (仅 boxzoom=true 和触屏设备时有效) 激活变焦当out/in（两个手指外张或收缩）
        grabcursorenabled: true, // (仅当 touchbehavior=true) 显示“抓住”图标display "grab" icon
        autohidemode: true, // 隐藏滚动条的方式, 可用的值: 
        //  true | // 无滚动时隐藏
        //  "cursor" | // 隐藏
        //  false | // 不隐藏,
        //  "leave" | // 仅在指针离开内容时隐藏
        //  "hidden" | // 一直隐藏
        //  "scroll", // 仅在滚动时显示        
        background: "", // 轨道的背景颜色
        iframeautoresize: true, // 在加载事件时自动重置iframe大小
        cursorminheight: 32, // 设置滚动条的最小高度 (像素)
        preservenativescrolling: true, // 你可以用鼠标滚动可滚动区域的滚动条和增加鼠标滚轮事件
        railoffset: false, // 可以使用top/left来修正位置
        bouncescroll: false, // (only hw accell) 启用滚动跳跃的内容移动
        spacebarenabled: true, // 当按下空格时使页面向下滚动
        railpadding: { top: 0, right: 0, left: 0, bottom: 0 }, // 设置轨道的内间距
        disableoutline: true, // 当选中一个使用nicescroll的div时，chrome浏览器中禁用outline
        horizrailenabled: true, // nicescroll可以管理水平滚动
        railalign: "right", // 对齐垂直轨道
        railvalign: "bottom", // 对齐水平轨道
        enabletranslate3d: true, // nicescroll 可以使用CSS变型来滚动内容
        enablemousewheel: true, // nicescroll可以管理鼠标滚轮事件
        enablekeyboard: true, // nicescroll可以管理键盘事件
        smoothscroll: true, // ease动画滚动
        sensitiverail: true, // 单击轨道产生滚动
        enablemouselockapi: true, // 可以用鼠标锁定API标题 (类似对象拖动)
        cursorfixedheight: false, // 修正光标的高度（像素）
        hidecursordelay: 400, // 设置滚动条淡出的延迟时间（毫秒）
        directionlockdeadzone: 6, // 设定死区，为激活方向锁定（像素）
        nativeparentscrolling: true, // 检测内容底部便于让父级滚动
        enablescrollonselection: true, // 当选择文本时激活内容自动滚动
        cursordragspeed: 0.3, // 设置拖拽的速度
        rtlmode: "auto", // DIV的水平滚动从左边开始
        cursordragontouch: false, // 使用触屏模式来实现拖拽
        oneaxismousemode: "auto", // 当只有水平滚动时可以用鼠标滚轮来滚动，如果设为false则不支持水平滚动，如果设为auto支持双轴滚动
        scriptpath: "", // 为boxmode图片自定义路径 ("" => same script path)
        preventmultitouchscrolling: true // 防止多触点事件引发滚动
    }
}
