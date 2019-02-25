## 开始学习 electron 啦，多多动手

> electron ：使用 JavaScript，HTML 和 CSS 构建跨平台的桌面应用

什么是 electron？

- 官网说法：electron 提供一个 Node.js 的运行时，专注于构建桌面应用，同时使用 web 页面来作为应用的 GUI，你可以将其看作是一个由 JavaScript 控制的 mini 版的 Chromium 浏览器
- 个人理解：electron 是一个运行时可以像 node.js 一样执行（electron app.js），也是一个使用 HTML + CSS + JavaScript 构建扩平台原生桌面应用的框架
- 本质上： electron 就是一个带了 Chrome 浏览器的壳子（无需考虑浏览器兼容性问题）

## 遇到的问题

- node-sass 装不上，找不到资源
  直接去到网上资源手动下载之后，在环境变量中配置 SASS_BINARY_PATH = 保存的本地路径
  然后执行 npm i -g node-sass 试试安装

- electron 装不上，npm install 报错
  electron 打包的时候需要下载一个版本库，速度非常的慢，可以借助淘宝镜像源解决
  ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/ npm install
  ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/ npm run build
