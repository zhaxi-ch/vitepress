## Mysql 相关
### 在mysql中创建纯数字数据库是不合标准的，默认会提示语法错误，但通过mysql转义符 ` 还是可以创建


### 4.1	查看mysql 的连接情况		

以下是一些常用命令，帮助我们了解当前数据库的配置。									
* 查询最大连接数   
	show variables like '%max_connections%';									
* 设置最大连接数  

set global max_connections=1000;									
* 响应的最大连接数   

show global status like 'Max_used_connections';									
* 查看线程信息	  

`show status like 'Threads%'	`								
* 睡眠连接超时数   

show global variables like 'wait_timeout';									
* 杀死连接id （表： INFORMATION_SCHEMA.PROCESSLIST）  

`kill 21120003	`								
### 4.2 关闭过多的sleep  线程		
对于正在运行中的生产服务器，在不能停止服务情况下，修改此项怎么办？很简单，以root用户登录到mysql,执行：											
```
set global wait_timeout=100												
set global wait_timeout=30;				###设置线程失效的时间	
SET GLOBAL interactive_timeout=30;					
```