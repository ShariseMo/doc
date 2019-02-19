# 服务器相关操作注意

> 重启服务器

- 阿里云服务器重启之后，不会自动启动 redis，需要手工启动或者在配置文件中加上参数
  - redis 一般在 /etc/redis 目录下
  - 写个 systemd 自启动
  - 将 daemonize 写入配置文件【守护进程】
  - redis-server --daemonize yes 【以守护进程形式启动 redis】
  - redis-server &



## 环境变量

> 系统中的环境变量path都是做什么的 ？
- path环境变量： 指定命令搜索路径
  在命令行下面执行 诸如Java编译程序时，他会到path变量所指定的路径中查找是否能找到相应命令程序
  我们需要把jdk安装目录下的bin目录增加到现有的path变量中
  设置好path变量之后，就可以在任意目录下执行javac/java等工具了