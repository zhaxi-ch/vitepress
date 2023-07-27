## 练习学习的例子

### 1.平方的计算
``` JAVA
// 要计算一个数的多次方，可以使用Java中的Math类中的pow()方法。pow()方法可以计算一个数的任意次方。例如，要计算2的3次方，可以按照以下步骤操作：
// 1. 定义一个变量，存储底数2。
// 2. 定义一个变量，存储指数3。
// 3. 使用Math类中的pow()方法计算2的3次方。
// 4. 输出结果。
public class pingfang {
    public static void main(String[] args) {
    int base = 2;
int exponent = 3;
double result = Math.pow(base, exponent);
System.out.println(result);
}
}
```
### 2 显示当前的日期

```
import java.util.Date;

public class DateDemo {
    public static void main(String[] args) {
        // 初始化 Date 对象
        Date date = new Date();

        // 使用 toString() 函数显示日期时间
        System.out.println(date.toString());
    }
}



```

### 3.显示当前时间内容
``` JAVA
import java.util.Date;

public class DateDemo {
    public static void main(String[] args) {
        // 初始化 Date 对象
        Date date = new Date();

        // c的使用
        System.out.printf("全部日期和时间信息：%tc%n", date);
        // f的使用
        System.out.printf("年-月-日格式：%tF%n", date);
        // d的使用
        System.out.printf("月/日/年格式：%tD%n", date);
        // r的使用
        System.out.printf("HH:MM:SS PM格式（12时制）：%tr%n", date);
        // t的使用
        System.out.printf("HH:MM:SS格式（24时制）：%tT%n", date);
        // R的使用
        System.out.printf("HH:MM格式（24时制）：%tRn", date);

        // 删除时区

        System.out.printf("时区：%tZn", date);

    }
}

```

何时需要使用 -classpath：当你要编译或执行的类引用了其它的类，但被引用类的 .class 文件不在当前目录下时，就需要通过 -classpath 来引入类
### 4. 汉诺塔算法


### 5.费那波契数列

斐波那契数列（Fibonacci sequence），又称黄金分割数列， 故又称兔子数列

### 6.instanceof 是一个二元操作符，类似于==，>,<等

### 7.阶乘   factorial 是所有小于以及等于该数的正整数的积  自然数的n的阶乘 写作  n！。
```
public class MainClass {
    public static void main(String args[]) {
    for (int counter = 0; counter <= 10; counter++){
        System.out.printf("%d! = %d\n", counter,
        factorial(counter));
    }
    }
    public static long factorial(long number) {
        if (number <= 1)
            return 1;
        else
            return number * factorial(number - 1);
    }
}

```
### 8.连接mysql ，查询返回数据
> 数据库的操作主要是分为更新操作和查询操作，查询操作的时候会将全部的查询结果返回给用户resultSet接口，在使用sql中的select语句可以将数据库的全部结果查询出来，在使用jdbc的操作数据库查询的记录使用resultSet接收在操作的时候使用statement的executeQuery方法进行数据库的查询操作，此方法返回的就是ResultSet接口在...

``` Java
package com.seic;

import java.sql.*;
// 通过DriverManager. registerDriver(Driver driver)来注册驱动程序
public class App {

    static final String USER = "admin"; // static final修饰的属性表示一旦给值，就不可修改
    static final String PASS = "*****";
    static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
    static final String DB_URL = "jdbc:mysql://192.168.1.1:3306/pydb?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC";

    public static void main(String[] args) {

        // System.out.println("Hello ");
        // System.out.println(JDBC_DRIVER);
        // System.out.println(DB_URL);
        Connection conn = null;
        Statement stmt = null;
        try {
            // 注册 JDBC 驱动
            Class.forName(JDBC_DRIVER);

            // 打开链接
            System.out.println("连接数据库...");
            conn = DriverManager.getConnection(DB_URL, USER, PASS);

            // 执行查询
            System.out.println(" 实例化Statement对象...");
            stmt = conn.createStatement();
            String sql;
            sql = "SELECT  * FROM User_list ul ";
            ResultSet rs = stmt.executeQuery(sql);
            
            System.out.println( rs.getClass().getSimpleName() );
             
               // 展开结果集数据库
               while (rs.next()) {
                // 通过字段检索
                int id = rs.getInt("ID");
                String name = rs.getString("LoginName");

                // 输出数据
                System.out.println("Email: " + id ) ;
                System.out.print("name: " + name ) ;
                System.out.print("\n");
            }
           

            // 完成后关闭
            rs.close();
            stmt.close();
            conn.close();

        } catch (Exception e) {
            e.printStackTrace();
            return;
        }

    }

}



```