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





























