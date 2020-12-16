import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NavbarComponent} from './components/navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {HomeComponent} from './components/home/home.component';
import {HomeCardsComponent} from './components/home-cards/home-cards.component';


@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    HomeCardsComponent
  ]
  ,
  exports: [
    NavbarComponent,
    HomeComponent,
    HomeCardsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    BrowserModule
  ]
})
export class CoreModule {
}
