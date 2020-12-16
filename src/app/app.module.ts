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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthInterceptor} from './auth.interceptor';
import {HelpComponent} from './components/help/help.component';
import {PostDeleteComponent} from './components/post-delete/post-delete.component';
import {UniqueUsernameDirective} from './directives/unique-username.directive';
import {RepeatPasswordValidatorDirective} from './directives/repeat-password.directive';
import {HomeCardsComponent} from './components/home-cards/home-cards.component';
import {CommentListComponent} from './components/comment-list/comment-list.component';
import {CommentNewComponent} from './components/comment-new/comment-new.component';
import {UserModule} from './components/user/user.module';

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
    HelpComponent,
    PostDeleteComponent,
    UniqueUsernameDirective,
    RepeatPasswordValidatorDirective,
    HomeCardsComponent,
    CommentListComponent,
    CommentNewComponent,
  ],
  imports: [
    UserModule,
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
