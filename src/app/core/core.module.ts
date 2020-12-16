import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NavbarComponent} from './components/navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';


@NgModule({
  declarations: [
    NavbarComponent]
  ,
  exports: [
    NavbarComponent
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
