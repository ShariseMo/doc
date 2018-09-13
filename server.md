# 服务器相关操作注意

> 重启服务器

- 阿里云服务器重启之后，不会自动启动 redis，需要手工启动或者在配置文件中加上参数
  - redis 一般在 /etc/redis 目录下
  - 写个 systemd 自启动
  - 将 daemonize 写入配置文件【守护进程】
  - redis-server --daemonize yes 【以守护进程形式启动 redis】
  - redis-server &
