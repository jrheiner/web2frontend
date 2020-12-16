import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RepeatPasswordValidatorDirective} from './directives/repeat-password.directive';
import {UniqueUsernameDirective} from './directives/unique-username.directive';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    RepeatPasswordValidatorDirective,
    UniqueUsernameDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    RouterModule
  ],
  exports: [
    RepeatPasswordValidatorDirective,
    UniqueUsernameDirective,
    FormsModule,
    BrowserModule,
    RouterModule
  ]
})
export class SharedModule {
}
