### Linux使用命令

### Linux是一種自由和開放源碼的類UNIX作業系統。 该操作系统的内核由林纳斯·托瓦兹在1991年10月5日首次发布，再加上使用者空間的應用程式之後，就成為了Linux作業系統。 Linux也是自由软件和开放源代码软件发展中最著名的例子

###  1. 日常使用命令
#### 1.`查询当前防火墙开启的端口`和开启端口

``` shell
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
#### 5.显示出开启可以自动启动的程序
```
systemctl list-unit-files |grep enabled
```

#### 6.修改一个文件到所属的组   
```
sudo chgrp test test.txt
```


### 5.1 关闭指定程序的开机自启动


#### 6.查询系统的账户
cut -d : -f 1 /etc/passwd

#### 7.查询系统可以登录的账户

cat /etc/passwd | grep -v /sbin/nologin | cut -d : -f 1

### 7.修改当前的DNS--（临时修改）
查询命令 cat /etc/resolv.conf
修改 的话，更改该文件内部的nameserver

### 8.查询进程占用资源的
查询内容占用前十名
ps aux | sort  -k4nr | head -10

查询CPU 占用前十名

ps aux | sort  -k3nr | head -10
### 9.自动更新程序导致内存大量被占用(Ubutun OS 22)

关闭命令

sudo systemctl disable unattended-upgrades.service

### 10.查询正在运行的端口
sudo ss -tulpn | grep LISTEN



###  2. 网络相关命令
      nmap，也就是Network Mapper，是Linux下的网络扫描和嗅探工具包。											
      nmap是在网络安全渗透测试中经常会用到的强大的扫描器						
```
nmap -p- T4  127.0.0.1    ### 
nmap -sP 172.16.0.*			### 寻找所有在线的主机	

```

### 3.异常处理问题      

#### 忘记root密码，无法进入系统（使用的是centos系统）
1 - 在启动grub菜单，选择编辑选项启动   

2 - 按键盘e键，来进入编辑界面   

3 - 按方向键下键↓，找到设置语言的地方，如LANG=en_US.UTF-8，在后面追加rw single init=/bin/bash

![密码重置](./reset0.png)
4 - 现在按下 Control+x ，使用单用户模式启动   

5 - 现在，可以使用下面的命令访问系统
6 - 重置密码

使用命令 passwd root
![密码重置](./reset.png)
7 - 更新系统信息

touch /.autorelabel

8 - 输入exec /sbin/init命令重启系统

exit

9 - 重启你的系统

reboot



-------
##  ubuntu 22 LTS 版本
#### 1.查询Ubuntu的版本和信息
  使用命令 cat /etc/os-release  或者 hostnamectl 
#### 2.查询内核信息
   使用命令  uname -r

#### 3.apt 安装bind
```
sudo apt-get install bind9-host dnsutils
sudo apt-get install bind9

```
#### 4. 重启bind 命令
sudo systemctl restart bind9.service

#### 5. 测试正向区域文件,请使用如下命令
```
named-checkzone example.com /etc/bind/db.example.com

```

### 故障排除
1.** server can't find www.baidu.com: REFUSED
   

2. 监听查询命令

sudo tcpdump  -n -i  ens160 host  172.19.172.188  and port  53

3.修改所属组
sudo  chgrp  bind  bind.keys
