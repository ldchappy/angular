### 新建angular新项目
1.先全局安装cli
npm install -g @angular/cli
2.创建
ng new my-app
3.启动
cd my-app
ng serve --open
如果4200端口被占用
ng serve --open --port 4201

### 分析主要文件 index.html
主要是这句：
<app-root></app-root>
我们的应用将会在app-root标签处进行渲染

###创建组件，如使用的是cli，则已有一个app组件,上面的app-root标签就是这个app组件要渲染出来的地方

#### 文件主要
1.导入依赖
2.声明组件

#### app组件的文件分析--app.component.ts文件
import { Component } from '@angular/core';这句为导入依赖
这里是导入了Component

#### 使用Component注解
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

selector这里相当与新建了一个新的标签，用于渲染显示

templateUrl这里为添加模板
两种方式：(内容少可使用直接添加)
templateUrl --->指定模板的位置地址
template：'<div>hello</div>'  --->为在本文件直接添加

styleUrls为添加CSS样式 --->地址方式

### 加载组件
在app.component.html文件中加入新标签(component注解中selector定义的)
例：<p><app-root></app-root></p>
这个<app-root></app-root>是要在app.component.html中显示的子组件(自己定义的子组件的component.ts文件定义的)

### 把数据添加到组件中（以user-item为例）
在user-item.component.ts中的export class中定义方法
例：export class UserItemComponent implements OnInit{
    name : string;//add name property 局部变量
    comstructor(){this.name = 'Felipe';//set the name}
    ngOnInit(){}
}
在这里，
1.在UserItemComponent类中添加了一个name属性
name：string  <---> 名：类型  --> 这是ts中的特性
2.定义了一个构造函数，在构造函数中，可通过this.name来设置name属性

渲染模板
在user-item.component.html中使用{{}}表达式显示name的值。
因为template是绑定到组件上的，so，name将会时this.name的值
***只能加载在.module.ts文件对应的.html的文件中？？***

使用数组
例：创建一个user-list组件来显示数组
1.在user-list.component.ts中改成定义一个数组
name:string[] -->这个数组只能是字符串数组
2.在constructor()中定义this.name=['a','s','d','f','g']
3.在user-list.component.html中定义循环
<ul>
  <li *ngFor="let li of name">hello {{li}}</li>
</ul>
*ngFor只能循环数组，不能循环对象？

下面使用item组件来显示list组件的内容
1.配置UserListComponent来渲染UserItemComponent
2.配置UserItemComponent来接收name变量作为输入
3.配置UserListComponent的模板来把用户名传给UserItemComponent

1.配置UserListComponent来渲染UserItemComponent
在user-list-component.html中修改成
<ul>
  <app-user-item *ngFor="let li of name2">hello {{li}}</app-user-item>
</ul>

2.配置UserItemComponent来接收name变量作为输入
**数据传值给子组件可用@Input注解
在user-item.component.ts中修改
1.导入依赖Input
import { Component, OnInit,Input } from '@angular/core';
2.在UserItemComponent方法中修改
export class UserItemComponent implements OnInit {
    @Input() name2:string;//加@input
  constructor() {  } //去掉
  ngOnInit() {
  }
}
3.配置UserListComponent的模板来把用户名传给UserItemComponent
<ul>
  <app-user-item *ngFor="let li2 of name2" [name2]="li2">hello {{li2}}</app-user-item>
</ul>
这里的[name2]是@Input()后的名称
user-item.component.html里写上{{name2}}

###总结子父组件传值：
父：
1.写上子组件生成的新标签 可加属性[循环数组名]="循环变量名"
子：
ts文件
1.导入Input依赖 2.定义变量加前缀@Input,并去掉construtor里的有关变量的内容
html文件
1、写上变量

###启动原理
angular-cli.json指定main.ts
main.ts是入口点，引导bootstrap我们的引用
引导过程中会引导一个Angular模块
我们使用AppModule来引导该引用，在app.module.ts中指定
AppModule指定了将那个模块用作顶层组件，这里是AppConponent
AppConponent有一个<app-user-list>渲染出来

###NgModule模块
这是个指引者的角色，指向要加载的组件
三个属性:declarations、imports、bootstrap
declarations指定组件
imports描述该模块有哪些依赖
bootstrap指向谁为顶层组件



















