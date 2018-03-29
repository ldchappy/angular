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

## angular的工作原理
一个概念：angular是由组件构成的
一个清楚：不要求使用指定的数据模型库

### 组件：构成angular应用的基本组成部分
每个组件有三个部分组成：
组件注解、视图、控制器

@Component({
  selector:'inventory-app',
  template:`
    <div class="inventory-app">
      (Products will go here soon)  
    </div>
  `
})
class InventoryApp{
  //.....
}

@Component注解明确了
selector(选择器)用来告诉angular要匹配那个HTML元素
template(模板)用来定义视图

### 组件注解
selector配置的可作为元素标签：<inventory-app></inventory-app>
可作为属性：<div inventory-app></div>

template--> 组件中可视部分
@Component({
  selector: 'inventory-app',
  template: `
  <div class="inventory-app">
  (Products will go here soon)
  </div>
  `
})

### 输入与输出
<products-list
  [productList]="products" <!-- input -->
  (onProductSelected)="productWasSelected($event)"> <!-- output -->
</products-list>
** 方括号[]用来传递输入，圆括号()用来处理输出

圆括号处理输出
在Angular中，使用输出来将数据传递出组件。
(onProductSelected)，即=号左边是我们要监听的输出的名称；
"productWasSelected"，即=号右边是当有新的输入时我们想要调用的方法；
$event在这里是一个特殊的变量，用来表示输出的内容。


## angular内置指令
###ngIf：根据一个条件来决定显示或隐藏一个元素
<div *ngIf="a > b"></div> <!-- displayed if a is more than b -->
<div *ngIf="str == 'yes'"></div> <!-- displayed if str holds the string "yes" -->

###ngSwitch:根据一个给定的条件来渲染不同的元素
<div class="ui raised segment">
  <ul [ngSwitch]="choice">
  <li *ngSwitchCase="1">First choice</li>
  <li *ngSwitchCase="2">Second choice</li>
  <li *ngSwitchCase="3">Third choice</li>
  <li *ngSwitchCase="4">Fourth choice</li>
  <li *ngSwitchCase="2">Second choice, again</li>
  <li *ngSwitchDefault>Default choice</li>
</ul>
</div>

###ngStyle:通过angular表达式给特定的DOM元素设定CSS属性
<div [style.background-color]="'yellow'">
  Uses fixed yellow background
</div>
另一种：
<div [ngStyle]="{color: 'white', 'background-color': 'blue'}">
  Uses fixed white text on blue background
</div>

** ngStyle真正的能力在于使用动态值
在这个例子中，我们定义了两个输入框。
<div class="ui input">
  <input type="text" name="color" value="{{color}}" #colorinput>
</div>
<div class="ui input">
  <input type="text" name="fontSize" value="{{fontSize}}" #fontinput>
</div>
<button class="ui primary button" (click)="apply(colorinput.value, fontinput\
.value)">
  Apply settings
</button>
然后使用它们的值来设置三个元素的CSS属性
在第一个元素中，我们基于输入框的值来设定字体大小。

code/built_in_directives/app/ts/ng_style/ng_style.ts
<div>
  <span [ngStyle]="{color: 'red'}" [style.font-size.px]="fontSize">
  red text
  </span>
</div>
注意，我们在某些情况下必须指定单位。例如，把font-size设置为12不是合法的CSS，必
须指定一个单位，比如12px或者1.2em。Angular提供了一个便捷语法用来指定单位：这里我们使
用的格式是[style.fontSize.px]。

后缀.px表明我们设置font-size属性值以像素为单位。你完全可以把它替换为[style.
font-size.em]，以相对长度为单位来表示字体大小；还可以使用[style.fontSize.%]，以百分
比为单位。
另外两个元素使用#colorinput的值来设置文字颜色和背景颜色。

code/built_in_directives/app/ts/ng_style/ng_style.ts
<h4 class="ui horizontal divider header">
  ngStyle with object property from variable
</h4>
<div>
  <span [ngStyle]="{color: color}">{{ color }} text</span>
</div>
<h4 class="ui horizontal divider header">
  style from variable
</h4>
<div [style.background-color]="color" style="color: white;">
  {{ color }} background
</div>

这样，当我们点击Apply settings按钮时，就会调用方法来设置新的值。

code/built_in_directives/app/ts/ng_style/ng_style.ts
apply(color: string, fontSize: number) {
  this.color = color;
  this.fontSize = fontSize;
}
与此同时，文本颜色和字体大小都通过NgStyle指令作用在元素上了。

### ngClass
在HTML模板中用ngClass属性来表示，让你能动态设置和改变一个给定DOM
元素的CSS类。

第一种方式是传入一个对象字面量。该对象希望以类名作为键，而值应该是
一个用来表明是否应该应用该类的真/假值。

假设我们有一个叫作bordered的CSS类，用来给元素添加一个黑色虚线边框。
.bordered {
  border: 1px dashed black;
  background-color: #eee;
}
我们来添加两个div元素：一个一直都有bordered类（因此一直有边框），而另一个永远都
不会有。
code/built_in_directives/app/ts/ng_class/ng_class.ts
<div [ngClass]="{bordered: false}">This is never bordered</div>
<div [ngClass]="{bordered: true}">This is always bordered</div>



<div style="font-size: 16px;
      text-indent: 2em;
     height: 250px; ">
    <p class="right20" style="text-align: right;
      margin-right: 20%;">编号：</p>
    <div style="float: left;">
      <p>借款人：$!borrowUserName </p>
      <p>营业执照号：$!borrowCardNo</p>
      <p>地址：</p>
      <p>电话：$!borrowUserMobile</p>
      <p>出借人：$!investUserName</p>
      <p>营业执照号：$!investUser.idNumber </p>
      <p>地址： </p>
      <p>法定代表人： </p>
    </div>
    <div style="float: right;
      margin-right: 256px;">
      <p>（以下简称甲方）</p>
      <p style="margin-top: 76px;">（以下简称乙方）</p>
    </div>
  </div>


<div style="font-size: 16px;
      text-indent: 2em;
     height: 250px; ">
    <p class="right20" style="text-align: right;
      margin-right: 20%;">编号：</p>
    <div>
      <p>借款人：$!borrowUserName<span style="margin-right: 20%; float: right;">（以下简称甲方）</span> </p>
      <p>营业执照号：$!borrowCardNo</p>
      <p>地址：</p>
      <p>电话：$!borrowUserMobile</p>
      <p>出借人：$!investUserName <span style="margin-right: 20%; float: right;">（以下简称乙方）</span></p>
      <p>营业执照号：$!investUser.idNumber </p>
      <p>地址： </p>
      <p>法定代表人： </p>
    </div>
  </div>



18200700885