### Linux使用命令

### Linux是一種自由和開放源碼的類UNIX作業系統。 该操作系统的内核由林纳斯·托瓦兹在1991年10月5日首次发布，再加上使用者空間的應用程式之後，就成為了Linux作業系統。 Linux也是自由软件和开放源代码软件发展中最著名的例子

###  1. 日常使用命令
#### 1.`查询当前防火墙开启的端口`和开启端口
``` centos7.9使用
firewall-cmd --zone=public --list-ports			 ### 查询开启的端口
### 开启服务器防火墙的8080端口
firewall-cmd --zone=public --add-port=8080/tcp --permanent    
firewall-cmd --reload      ### 应用
```
#### 2.设置mysql开机自动运行_避免重启导致服务不启动
```
systemctl enable mysqld		
systemctl daemon-reload		

```

#### 3.查询最近登录三次的信息
last -a | head -3	

#### 4.显示完整的时间
```
date '+%c'

```




###  2. 网络相关命令
      nmap，也就是Network Mapper，是Linux下的网络扫描和嗅探工具包。											
      nmap是在网络安全渗透测试中经常会用到的强大的扫描器						
```
nmap -p- T4  127.0.0.1    ### 
nmap -sP 172.16.0.*			### 寻找所有在线的主机	

```
