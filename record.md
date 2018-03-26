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

###新建组件
ng generate component xxx

### 这是？？
declare var jQuery: any;

##讲解ts
### typeScript
typeScript包含了ES6包含了ES5

typeScript相对与ES5有五大改善
类型、类、注解、模块导入、语言工具包(如，解构)

#### 类型
因typeScript从ES5演化来的，so，ts仍可以使用var来定义变量
也提供可选的变量类型：
var name : string; -->var 变量名 ： 规定类型
在声明函数时，也可为函数的参数和返回值指定类型：
function greetText(name:string):string{
  return 'hello' + name;
}
这里的name参数传入来的参数只能为string类型
：string{ 指定返回值类型

#### ts内置类型
string  字符串 --> var name:string = 'Felipe';
number  数字(任何类型数字)---> var age:number = 30;
boolean 布尔类型 --> var marred:boolean = true;
Array   数组类型(一组相同数据的集合)，so，还要指定一种类型
  使用Array<type> or type[]来为数组条目指定元素类型
  var jobs:Array<string> = ['aa','ss','dd','ff'];
  var jobs:string[] = ['aa','ss','dd','ff'];
  数字型数组类似
  var jobs:Array<number> = [1，2，3，4，5，6];
  var jobs:number[] = [1，2，3，4，5，6];

枚举类型
  是一组可命名数值的集合，如，想拿到某人的一系列角色
  enum Role{Employee,Manager,Admin}
  var role:Role = Role.Employee;

  默认下，初始值为0，可调整初始化值的范围
  enum Role {Employee = 3,Manager,Admin};
  var role:Role = Role.Employee;
  这里的初始值为3，而其他项会依次递增

  同样的，也可以为每一项指定值
  enum Role {Employee = 3,Manager=6,Admin=9};
  var role:Role = Role.Employee;

任意类型
  在ts中，没有指定类型，默认为any，any的变量可接收任意类型的数据
  var something:any = 'string';
  something = 123;
  something = [1,2,3]

无类型
  void意味我们不期望那里有类型。常用于作函数的返回值，表示没有任何返回值：
  function setName(name:string ):void{
    this.name = name;
  }

类
  ES5中不使用类，而是依赖与原型
  用class关键字定义类
  class venicle{}   类可以包含属性、方法、构造函数

属性
定义了类实例对象的数据，如
Person类的声明是这样的：
Person{
  first_name:string;
  last_name:string;
  age:number;
}

方法
运行在类对象实例上下文中的函数，在调用对象的方法之前，必须要有这个对象的实例
**要实例化一个类，使用new关键字
如我们希望问候某个Person，可这样：
class Person{
  first_name:string ;
  lastP_name:string ;
  age:number;

  greet(){
    console.log('hello',this.first_name);
  }
}

注：借助this关键字，能用this.first_name表达式来访问Person类的first_name属性
调用greet方法之前，要有Person类的实例对象
var p:Person = new Person();
p.first_name = 'Felipe';
p.greet();

### 构造函数
是当类进行实例化时执行的特殊函数。常用与对新对象进行初始化
**构造函数必须命名为constructor
**可有输入参数，但不能有任何返回值
**要通过调用new ClassName()来执行构造函数，以完成类的实例化

当类没有显式定义构造函数时，将自动创建一个无参构造函数
class Vehicle{};
var v = new Vehicle();
等价于：
class Vehicle{construcotr(){}}
var v = new Vehicle();

可以使用带参数的构造函数来将对象的创建工作参数化
class Person{
  first_name:string ;
  lastP_name:string ;
  age:number;

  constructor(first_name:string,lastP_name:string,age:number){
    this.first_name = first_name;
    this.lastP_name = last_name;
    this.age = age;
  }

  greet(){
    console.log('hello',this.first_name);
  }
}

继承
表明子类能从父类中得到的行为，可已在子类中重写、修改或添加行为
继承用extends关键字实现

### => 是函数的一种书写简洁语法
guiters.forEach(function(g){
  console.log(sele.name+'g')
})

---->
guiters.forEach((g)==>{
  console.log(sele.name+'g')
})
看着 =>  <==> function{}

### 模板字符串
** 可在模板字符串中使用变量(不必使用+来拼接字符串)
** 支持多行字符串

1.字符串中的变量，也叫字符串插值
var firstName = 'Nate';
var lastName = 'Murrey';

var greeting = `Hello ${firstName} ${lastName}`
** 要是用反引号

2.多行字符串
反引号字符串可多行文本
var template= `
<li class="">
  <div class="num">2</div><div class="lab mar_right">赵*</div>
    <div class="dat">￥1,530,900.00</div>
</li>
`





















