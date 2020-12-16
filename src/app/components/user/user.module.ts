import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserDeleteComponent} from './user-delete/user-delete.component';
import {UserDetailsComponent} from './user-details/user-details.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {UserSavedComponent} from './user-saved/user-saved.component';
import {AppRoutingModule} from '../../app-routing.module';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [
    UserDeleteComponent,
    UserDetailsComponent,
    UserEditComponent,
    UserSavedComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
  ]
})
export class UserModule {
}
