## 开始学习 electron 啦，多多动手

> electron ：使用 JavaScript，HTML 和 CSS 构建跨平台的桌面应用

什么是 electron？

- 官网说法：electron 提供一个 Node.js 的运行时，专注于构建桌面应用，同时使用 web 页面来作为应用的 GUI，你可以将其看作是一个由 JavaScript 控制的 mini 版的 Chromium 浏览器
- 个人理解：electron 是一个运行时可以像 node.js 一样执行（electron app.js），也是一个使用 HTML + CSS + JavaScript 构建跨平台原生桌面应用的框架
- 本质上： electron 就是一个带了 Chrome 浏览器的壳子（无需考虑浏览器兼容性问题）
- electron 打包只能针对各个平台自己打包自己适用的应用版本 【https://www.electron.build/multi-platform-build】
  不要指望你可以在一个平台上为所有平台构建应用程序

## 遇到的问题

- node-sass 装不上，找不到资源
  直接去到网上资源手动下载之后，在环境变量中配置 SASS_BINARY_PATH = 保存的本地路径
  然后执行 npm i -g node-sass 试试安装

- electron 装不上，npm install 报错
  electron 打包的时候需要下载一个版本库，速度非常的慢，可以借助淘宝镜像源解决
  ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/ npm install
  ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/ npm run build

## 用 electron-vue-admin 搭建一个后台系统 ，并打包成各平台应用

- 使用开源项目 electron-vue-admin 【https://github.com/PanJiaChen/electron-vue-admin】
- npm install：若装不上，就尝试 electron 镜像【ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/ npm install】
- npm run dev
- npm run build: build electron app for production
- npm lint: 建立应用程序软链接 【类似 应用程序桌面快捷方式】
- npm run pack: run webpack in production

## 查看配置

- package.json
- build.js


## 学习angular[ng-antd + electron]

> ng-antd: https://ng.ant.design/docs/introduce/en

- $ npm install -g @angular/cli   // 全局安装angular
- $ ng new PROJECT-NAME   // 新建一个angular-antd项目
- $ cd PROJECT-NAME
- $ ng add ng-zorro-antd --i18n=en_US
- $ ng serve --port 0 --open   // 开启项目

## ng-alain

> ng-alain: https://ng-alain.com/

- API相关约定
  - []  表示属性
  - ()  表示事件
  - [()] 表示双向绑定
  - ng-content 表示组件内容占位符
  - #tpl  开头表示  <ng-template #tpl>

- 技术栈：本地环境需要安装 node 和 git。技术栈基于 Typescript、Angular、g2、@delon 和 ng-zorro-antd
