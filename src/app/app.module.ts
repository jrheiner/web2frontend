import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {PostListComponent} from './components/post-list/post-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthInterceptor} from './auth.interceptor';
import {HelpComponent} from './components/help/help.component';
import {HomeCardsComponent} from './components/home-cards/home-cards.component';
import {UserModule} from './components/user/user.module';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {PostModule} from './components/post/post.module';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    LoginComponent,
    RegisterComponent,
    HelpComponent,
    HomeCardsComponent,
  ],
  imports: [
    CoreModule,
    SharedModule,
    UserModule,
    PostModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
