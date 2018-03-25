import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { UserItemComponent } from './user-item/user-item.component';
import { UserListComponent } from './user-list/user-list.component';
import { RedditComponent } from './reddit/reddit.component';
import { ArticleComponent } from './article/article.component';



@NgModule({
  declarations: [
    AppComponent,
    UserItemComponent,
    UserListComponent,
    RedditComponent,
    ArticleComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
