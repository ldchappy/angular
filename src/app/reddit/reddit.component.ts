import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-reddit',
  templateUrl: './reddit.component.html',
  styleUrls: ['./reddit.component.css']
})
export class RedditComponent implements OnInit {
    //title = "app works";

    articles:Article[];

  constructor() {
    this.articles = [
      new Article('a2','ai',3),
      new Article('w3','we',4),
    ]
  }

  addArticle(title:HTMLInputElement,link:HTMLInputElement):boolean{
      console.log(`${title.value}&${link.value}`);
      this.articles.push(new Article(title.value,link.value,0));
      title.value = '';
      link.value = '';
      return false;
  }

  ngOnInit() {
  }

}
