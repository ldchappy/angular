### 学到什么
1.你使用 CLI 创建了第二个组件 HeroesComponent。

2.你把 HeroesComponent 添加到了壳组件 AppComponent 中，以便显示它。

3.你使用 UppercasePipe 来格式化英雄的名字。

4.你用 ngModel 指令实现了双向数据绑定。

5.你知道了 AppModule。

6.你把 FormsModule 导入了 AppModule，以便 Angular 能识别并应用 ngModel 指令。

7.你知道了把组件声明到 AppModule 是很重要的，并认识到 CLI 会自动帮你声明它。

----------第3部分 start--------
###创建英雄列表组件
ng generate component heroes

###CLI 自动生成了三个元数据属性：

selector— 组件的选择器（CSS 元素选择器）

templateUrl— 组件模板文件的位置。

styleUrls— 组件私有 CSS 样式表文件的位置。

### ngOnInit 是一个生命周期钩子，Angular 在创建完组件后很快就会调用 ngOnInit。这里是放置初始化逻辑的好地方。

###始终要 export 这个组件类，以便在其它地方（比如 AppModule）导入它。

### 添加 hero 属性
可以在heroes.component.ts文件中直接添加属性
~~~
export class HeroesComponent implements OnInit {
	hero = 'windstorm'
	constructor() { }

  	ngOnInit() {//放置初始化逻辑的好地方
  }
~~~

### 显示 HeroesComponent 视图
要显示 HeroesComponent 你必须把它加到壳组件 AppComponent 的模板中
~~~
在src/app/app.component.html文件中
<h1>{{title}}</h1>
<app-heroes></app-heroes>
~~~

### 创建 Hero 类
可在app.module文件同级中添加类文件，为ts后缀

### 类导入到component中使用
~~~
在src/app/heroes/heroes.component.ts文件中

1.import { Hero } from '../hero';

2.export class HeroesComponent implements OnInit {
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };
~~~

### 使用 UppercasePipe 进行格式化
~~~
<h2>{{ hero.name | uppercase }} Details</h2>
~~~
绑定表达式中的 uppercase 位于管道操作符（ | ）的右边，用来调用内置管道 UppercasePipe。
管道 是格式化字符串、金额、日期和其它显示数据的好办法。

### 双向绑定
[(ngModel)] 是 Angular 的双向数据绑定语法

### 缺少 FormsModule
虽然 ngModel 是一个有效的 Angular 指令，不过它在默认情况下是不可用的，
它属于一个可选模块 FormsModule，你必须自行添加此模块才能使用该指令。

### 导入 FormsModule
打开 AppModule (app.module.ts) 并从 @angular/forms 库中导入 FormsModule 符号。
~~~
1.import { FormsModule } from '@angular/forms';

2.把 FormsModule 添加到 @NgModule 元数据的 imports 数组中，这里是该应用所需外部模块的列表。
imports: [
  BrowserModule,
  FormsModule
],
~~~

### 声明 HeroesComponent
~~~
1.每个组件都必须声明在（且只能声明在）一个 NgModule 中。

2.打开 src/app/app.module.ts 你就会发现 HeroesComponent 已经在顶部导入过了。

import { HeroesComponent } from './heroes/heroes.component';

HeroesComponent 也已经声明在了 @NgModule.declarations 数组中。

declarations: [
  AppComponent,
  HeroesComponent
],
~~~
----------第3部分 end--------

----------第4部分 start--------
### 创建模拟（mock）的英雄数据在mock-heroes文件中
~~~
import {Hero} from './hero';

export const HEROES:Hero[] ={
  { id: 11, name: 'Mr. Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
}
~~~

### 显示数据
在HeroesComponent 类文件，并导入模拟的 HEROES。
~~~
1.import { HEROES } from '../mock-heroes';

2.往类中添加一个 heroes 属性，这样可以暴露出这些英雄，以供绑定。
heroes = HEROES;

### 使用 *ngFor 列出这些英雄
HeroesComponent 的模板文件
~~~
<h2>My Heroes</h2>
<ul class="heroes">
  <li *ngFor="let hero of heroes">
  	<span class="badge">{{hero.id}}</span> {{hero.name}}
  </li>
</ul>
~~~

###主从结构
当用户在主列表中点击一个英雄时，该组件应该在页面底部显示所选英雄的详情。

### 添加 click 事件绑定
往 <li> 元素上插入一句点击事件的绑定代码
~~~
<li *ngFor="let hero of heroes" (click)="onSelect(hero)">
~~~
onSelect() 是 HeroesComponent 上的一个方法

### 添加 click 事件处理器
把该组件的 hero 属性改名为 selectedHero，但不要为它赋值。

### 修改详情模板
该模板引用的仍然是老的 hero 属性，但它已经不存在了。 把 hero 改名为 selectedHero
~~~
selectedHero:Hero;

  onSelect(hero:Hero):void{
    this.selectedHero = hero;
  }
~~~

### 使用 *ngIf 隐藏空白的详情
会出现错误：
ERROR TypeError: Cannot read property 'name' of undefined

当应用启动时，selectedHero 是 undefined，设计如此。

但模板中的绑定表达式引用了 selectedHero 的属性（表达式为 {{selectedHero.name}}），这必然会失败，因为你还没选过英雄呢。

### 修复
给这个 div 添加 Angular 的 *ngIf 指令，把它的值设置为 selectedHero。

### 给所选英雄添加样式
[class.selected]="hero === selectedHero"

说明：如果当前行的英雄和 selectedHero 相同，Angular 就会添加 CSS 类 selected，否则就会移除它。

----------第4部分 end--------
----------第5部分 start--------

### 学到？？
1.你创建了一个独立的、可复用的 HeroDetailComponent 组件。

2.你用属性绑定语法来让父组件 HeroesComponent 可以控制子组件 HeroDetailComponent。

3.你用 @Input 装饰器来让 hero 属性可以在外部的 HeroesComponent 中绑定。


### 主从组件
把英雄详情移入一个独立的、可复用的 HeroDetailComponent。

HeroesComponent 将仅仅用来表示英雄列表。 HeroDetailComponent 将用来表示所选英雄的详情。

### 制作 HeroDetailComponent
ng generate component hero-detail

### 编写详情模板
~~~
 新的 HeroDetailComponent 可以展示任意英雄，而不仅仅所选的。因此还要把模板中的所有 selectedHero 替换为 hero。

 在hero-detail.component.html文件中：
 <div *ngIf="hero">

  <h2>{{ hero.name | uppercase }} Details</h2>
  <div><span>id: </span>{{hero.id}}</div>
  <div>
    <label>name:
      <input [(ngModel)]="hero.name" placeholder="name"/>
    </label>
  </div>

</div>

而在heroes.component文件中
<app-hero-detail [hero]="selectedHero"></app-hero-detail>
~~~

### 添加@Input() hero 属性
hero 属性必须是一个带有 @Input() 装饰器的输入属性，因为外部的 HeroesComponent 组件将会绑定到它。
~~~
<app-hero-detail [hero]="selectedHero"></app-hero-detail>

[hero]="selectedHero" 是 Angular 的属性绑定语法。
这是一种单向数据绑定。从 HeroesComponent 的 selectedHero 属性绑定到目标元素的 hero 属性，并映射到了 HeroDetailComponent 的 hero 属性。
~~~

### 导入input
import { Component, OnInit, Input } from '@angular/core';

### 子组件添加带有 @Input() 装饰器的 hero 属性。
@Input() hero: Hero;


















