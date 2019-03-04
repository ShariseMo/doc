> Vue 基础 【查漏补缺】

## 前端框架和库的区别
- jQuery库：DOM操作DOM + 请求
- art-template库： 模板引擎
- 框架 = 全方位功能齐全
  - 简易的DOM体检 + 发请求 + 模板引擎 + 路由功能
- 在KFC的世界里： 库是小套餐， 框架是全家桶
- 库和框架在代码上的不同
  - 一般使用库的代码，是调用某个函数
  - 一般使用框架，是让框架帮助我们运行我们编写好的代码


## 设计模式
https://www.cnblogs.com/jhli/p/6555346.html
- MVC
  - Model（模型）：数据保存
  - View（视图）：用户界面
  - Controller（控制器）：业务逻辑
  - 各部分的通信方式：【所有通信都是单向的】
    - View 传送指令到Controller
    - Controller 完成业务指令后，要求Model保存数据，改变状态
    - Model 将新的数据发送到View，用户得到反馈
- MVP
  MVP模式将Controller改名为Presenter，同时改变了通信方向
  - 通信的双向的
  - View 和 Model 不发生联系，都是通过Prsenter传递
  - View 非常薄，不部署任何业务逻辑，称为“被动视图”（Passive View），没有任何的主动性。Presenter非常厚，所有逻辑都部署在那里
- MVVM
  - MVVM 模式将Presenter改名为ViewModel，基本上跟MVP模式一致
  - 区别： MVVM采用双向绑定（data-binding）：View 的变动自动反映在 View Model，View Model的变动也自动改变View