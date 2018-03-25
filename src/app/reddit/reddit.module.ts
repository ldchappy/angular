import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { redComponent } from './reddit.component';
import { ArticleComponent } from '../article/article.component';
import { ArticleModel } from '../article/article.ArticleModel';

@NgModule({
  declarations: [
    redComponent,
    ArticleComponent,
    ArticleModel
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [redComponent]
})



