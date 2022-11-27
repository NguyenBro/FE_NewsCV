import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { ResignComponent } from './homepage/resign/resign.component';
import { LoginComponent } from './homepage/login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { SharedModule } from './shared/styles/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HomepageModule } from './homepage/homepage.module';
import { newsService } from './homepage/services/news.service';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    NzPaginationModule,
    NzDropDownModule,
    SharedModule,
    HttpClientModule,
    HomepageModule,
  ],
  providers: [newsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
