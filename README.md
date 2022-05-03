# react-cms

react cms后台管理系统

## 技术栈

react + react-router-dom v6 + redux + axios + less + Ant Design

## 目标功能

- [x] 登录功能
- [x] 注册功能
- [x] 退出登录
- [x] 文章列表
- [x] 文章添加
- [x] 文章修改
- [x] 文章删除
- [x] 头像上传
- [x] 账号修改

## 项目运行

> 注意：本项目是在react 18更新之后使用的，react-router-dom的版本为6.x。
>
> 鉴于本项目仅为学习的小案例，以及案例中存在游客模式，故没有添加鉴权功能。

- 克隆项目源代码

	```js
	git clone https://github.com/wuyao-fee/react-cms.git
	```

- 切换到目标文件夹

	```js
	cd react-cms
	```

- 安装依赖库

	```js
	npm install 或 yarn
	```

- 运行项目

	```js
	npm run start
	```

## 项目布局

```js
├── build                                       // webpack打包文件
├── config                                      // 项目解包后的配置文件
├── public									 //
├── scripts									 // 脚本命令
├── src                                         // 源码目录
│   ├── api                              		// 封装api请求
│   ├── assets                              	// 静态资源
│   ├── components                              // 公共组件
│   ├── router                              	// 路由
│   ├── store                              		// 共享数据仓库
│   ├── utils                              		// 工具库
│   ├── pages                              		// 页面
│   ├── App.jsx                                 // 页面入口文件
│   ├── index.js                                // 程序入口文件，加载各种公共组件
├── package-lock.json                           // 包的详细信息
├── package.json                                // webpack配置及包管理
```

## 接口数据

本项目有专门的后台服务器系统，由`前端aka老师`提供，属于公开的供以学习使用。

接口地址为：http://47.93.114.103:6688/manage

## 效果展示

[查看demo请点击这里](http://cms.wuyao.ink/)。（PC模式即可）























