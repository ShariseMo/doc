> webpack

## 概念

本质上，webpack 是一个现代 js 应用的静态模块打包器（module bundler）。
当 webpack 处理你的应用程序时，它会递归构建一个依赖关系图（dependency graph），其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle 包

四个核心概念

- 入口（entry）
- 输出（output）
- loader（style-loader，js-loader。。）
- 插件（plugins）

## 入口（entry）

作用：入口起点指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始，进入入口起点后，webpack 会找出有哪些模块和库是入口起点依赖的

```
module.exports = {
    entry: './path/to/my/index.js'
};
```

## 出口（output）

作用：output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值是'./dist'，基本上，整体应用程序结构，都会被编译到你指定的输出路径的文件夹中。

> webpack 的优势

前端优化：减少 http 请求，减少静态文件的请求，
webpack 有灵活的插件和 loader

## webpack 基础知识

> 为什么我们需要构建工具

- 转换 ES6 语法
- 转换 JSX
- CSS 前缀不全 / 预处理器
- 压缩混淆
- 图片压缩

## 速度优化策略

- 使用 webpack4：webpack4 相对于 webpack3 性能有比较大的提升
- 多进程/多实例构建: happyPack
- 分包
- 缓存：二次提升构建速度，使用 HardSourceWebpackPlugin 或 cache-loader
- 缩小构建目标: 尽可能地少构建模块，比如 babal-loader 不解析 node_modules
  ```
      module.exports = {
          rules: {
              test: /\.js$/,
              loader: 'happypack/loader',
              exclude: 'node_modules'
          }
      }
  ```

## 如何分析页面结构

webpack bundle analyzer

## 构建体积优化

- Scope Hoisting
  现象： 构建后的代码存在大量重复的闭包代码
- Tree-shaking
- 公共资源分离
- 图片压缩
- 动态 Polyfill
