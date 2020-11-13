import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {HomeComponent} from './components/home/home.component';
import {PostListComponent} from './components/post-list/post-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {PostDetailsComponent} from './components/post-details/post-details.component';
import {PostNewComponent} from './components/post-new/post-new.component';
import {PostEditComponent} from './components/post-edit/post-edit.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {UserDetailsComponent} from './components/user-details/user-details.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserEditComponent} from './components/user-edit/user-edit.component';
import {AuthInterceptor} from './auth.interceptor';
import {UserDeleteComponent} from './components/user-delete/user-delete.component';
import {HelpComponent} from './components/help/help.component';
import { PostDeleteComponent } from './components/post-delete/post-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PostListComponent,
    PostDetailsComponent,
    PostNewComponent,
    PostEditComponent,
    LoginComponent,
    RegisterComponent,
    UserDetailsComponent,
    UserEditComponent,
    UserDeleteComponent,
    HelpComponent,
    PostDeleteComponent
  ],
  imports: [
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
