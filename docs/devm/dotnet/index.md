# Dotnet 的内容



>**WINform Windows Forms**是一种基于传统Win32 API的技术，使用C#或VB.NET语言进行开发。它提供了一组用于创建用户界面的控件，如按钮、文本框、标签等。WINform使用事件驱动模型，在代码中处理用户交互，并且可与其他技术（如ADO.NET）结合使用。

>**WPF（Windows Presentation Foundation**是一种更现代化、更强大的UI框架，也是使用C#或VB.NET进行开发。它采用XAML（可扩展应用程序标记语言）来描述用户界面，将界面和逻辑分离，使开发人员可以更灵活地设计应用程序的外观和行为。WPF还提供了强大的数据绑定、样式和动画功能，以及易于定制和扩展的控件模型。 

XAML （ extensible  appliction Markup Lanague) 可拓展应用程序标记语言

### WPF 的文件结构
1. MainWindow.xaml 文件是WPF 应用程序的主窗口，它包含了应用程序的用户界面，
2. APP.xaml 是WPF 应用程序级别资源文件，它可以定义应用程序范围内的资源，如样式，模板，转换等

### Mahapps.Metro 框架的使用

>来自德国公司开源的UI框架，专为WPF（Windows Presentation Foundation）应用程序设计。该框架提供了丰富的现代化UI控件和主题样式，旨在帮助开发人员快速构建具有吸引力和一致性的用户界面。

**创建第一Mahapps的程序**   

1. 安装MahApps.Metro 
  首先创建一个WPF 项目，然后使用NUget来安装MahApps.Metro 的程序包

  ![WPF](./dotnet/wpf1.1.png)
2. 引用MahApps.metro 的命令空间   

>namespace 是一种组织和管理代码的机制，它提供了一种将相关类，接口，结构和其他类型组织在一起的方式，以避免命名冲突
点击工具--NUGet包管理器---管理解决方案的NU固态程序包
  ![WPF](./dotnet/wpf1.2.png)

3. 在线搜索下载这个Mahapps的包   

![WPF](./dotnet/wpf1.3.png) 

![WPF](./dotnet/wpf1.4.png)
4. 使用MahApps.Metro的控件
* 引用MahApps的命名空间
在XAML文件中，添加对MahApps.Metro命名空间的引用。例如，在Window标签中添加xmlns:metro="clr-namespace:MahApps.Metro.Controls;assembly=MahApps.Metro"。

*  替换默认的Windows类
将默认的Window类替换为MahApps.Metro提供的MetroWindow类。在XAML文件中，将Window标签替换为metro:MetroWindow标签。在代码文件中，将继承的Window类替换为MetroWindow类  

* 应用MahApps 的样式
在App.xaml文件中，引用MahApps.Metro提供的内置样式。在Application.Resources标签内添加ResourceDictionary，并在其中添加对MahApps.Metro样式的引用。例如，添加<ResourceDictionary Source="pack://application:,,,/MahApps.Metro;component/Styles/Controls.xaml"/>

* 使用 MashApps.Metro控件
在XAML文件中使用MahApps.Metro提供的控件。例如，使用metro:Tile控件创建一个瓦片式按钮，或者使用metro:TreeView控件创建一个树形视图