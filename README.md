# 配置规范
所有路径引用都使用相对路径

./config/global.js 所有全局变量配置路径

./config/globalFn.js 所有全局方法配置路径

./assets/css/* 所有页面样式路径

./assets/img/* 所有图片路径

./assets/js/* 其他js路径

./assets/plugins/bootstrap/* 所有插件路径，如bootstrap

./includes/* 所有面路径

./includes/user/list.html、modify.html (含子页面的路径,新增修改共用页面) 

./includes/user/list.html 里包含本页面的html和js 所有页面逻辑在各个页面里单独写

# 开发规范
全局变量：大写加下划线连接如->GLOBAL、GLOBAL_CONFIG

功能函数：驼峰命名法如->functionName(){}

自定义变量：小写加下划线如->result、result_data

样式id、class命名：小写加中划线如->table、table-name





