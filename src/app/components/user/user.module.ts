import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserDeleteComponent} from './user-delete/user-delete.component';
import {UserDetailsComponent} from './user-details/user-details.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {UserSavedComponent} from './user-saved/user-saved.component';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from '../../app-routing.module';


@NgModule({
  declarations: [
    UserDeleteComponent,
    UserDetailsComponent,
    UserEditComponent,
    UserSavedComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule
  ]
})
export class UserModule {
}
