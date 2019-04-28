import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { API_URL } from './app.const';

import { NewsFeedContainer } from './components/news/news-feed.container';
import { NewsFeedService } from './services/news-feed.service';

import { AppNewsComponent } from './components/app-news/app-news.component';
import { PostComponent } from './components/post/post.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    AppNewsComponent,
    NewsFeedContainer,
    PostComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    NewsFeedService,
    { provide: "apiUrl", useValue: API_URL }
  ],
  bootstrap: [AppNewsComponent]
})
export class AppModule { }
