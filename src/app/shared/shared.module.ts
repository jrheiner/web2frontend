import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RepeatPasswordValidatorDirective} from './directives/repeat-password.directive';
import {UniqueUsernameDirective} from './directives/unique-username.directive';


@NgModule({
  declarations: [
    RepeatPasswordValidatorDirective,
    UniqueUsernameDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RepeatPasswordValidatorDirective,
    UniqueUsernameDirective
  ]
})
export class SharedModule {
}
