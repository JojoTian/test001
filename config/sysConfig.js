
var SYS_CONFIG = {
	title: "建设资金",
	logo: "./assets/img/logo.jpg",
	ico: "./assets/ico/ico.jpg",
	menu: [
          {text: '首页', href: 'main', target: GLOBAL_CONFIG.route.main.url, state: {selected:true},},
		  {
			text: '系统管理', selectable:false,
            nodes: [
              {text: '用户管理', href: 'user', target: GLOBAL_CONFIG.route.user.url},
			  {text: '角色管理', href: 'role', target: GLOBAL_CONFIG.route.role.url},
			  {text: '权限管理', href: 'authority', target: GLOBAL_CONFIG.route.authority.url},
			  {text: '日志查询', href: 'sysLog', target: GLOBAL_CONFIG.route.sysLog.url},
			  {text: '系统监控', href: 'sysMonitor', target: GLOBAL_CONFIG.route.sysMonitor.url},
			  {text: '配置信息维护', href: 'sysSetting', target: GLOBAL_CONFIG.route.sysSetting.url},
			  {text: '字典数据维护', href: 'codeSetting', target: GLOBAL_CONFIG.route.codeSetting.url}
            ]
          },
    ],
}
