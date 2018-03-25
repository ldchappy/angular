import { Component, OnInit,Input } from '@angular/core';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  host:{
    class:'row',//说明在要宿主的身上加一个class样式
  }
})
export class ArticleComponent implements OnInit {
    //votes:number;
    //link:string;
    //title:string;

    //添加了新类后上面的改成一个类
    @Input() article:Article;



    //构造函数设置默认值
  //constructor() {
    //this.title = 'Angular2';
    //this.link = 'http//io';
    //this.votes = 10;

    //this.article = new Article(
   //     'Angular2',
   //     'http//io',
   //     10
   // );
  //}

  voteUp():boolean{
    this.article.voteUp();
    return false;
  }
  voteDown():boolean{
    this.article.voteDown();
    return false;
  }

  ngOnInit() {
  }

}
