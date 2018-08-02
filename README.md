# php 大法

> Trait

- Trait 能解决 php 的单继承问题
-

> 事务：Transaction

- PDO::beginTransaction();

```
DB::beginTransation();  // 启动一个事务
DB::commit();   // 结束事务并提交
DB::rollback();  // 将回滚对数据库做出的更改，并将数据库连接返回到自动提交模式
```

一般会在事务这里加上 try-catch 判断

```
try{
    DB::beginTransation();
    // TODO: 一些业务代码
    DB::commit();  
}catch(Exception $e){
    DB::rollback();  // 检测到异常则回滚
}
```

> try--catch(){}

- try/catch/finally 语句用于处理代码中可能出现的错误信息，语法错误等
- try 语句：定义执行时进行错误测试的代码段
- catch 语句：定义 try 代码发生错误时执行的代码
- finally 语句： 在 try 和 catch 之后无论有无异常都会执行
- catch 和 finally 语句都是可选的，但是在使用 try 语句之后必须至少使用一个
- 当错误发生时，JavaScript 会停止执行，并生成一个错误信息，使用 throw 语句来抛出异常。将 throw 华为 try-catch 一起使用，就可以控制程序输出的错误信息
