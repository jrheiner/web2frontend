import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostListComponent} from './components/post-list/post-list.component';
import {PostDetailsComponent} from './components/post/post-details/post-details.component';
import {PostNewComponent} from './components/post/post-new/post-new.component';
import {PostEditComponent} from './components/post/post-edit/post-edit.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {UserDetailsComponent} from './components/user/user-details/user-details.component';
import {AuthGuard} from './auth.guard';
import {UserEditComponent} from './components/user/user-edit/user-edit.component';
import {UserDeleteComponent} from './components/user/user-delete/user-delete.component';
import {HelpComponent} from './components/help/help.component';
import {PostDeleteComponent} from './components/post/post-delete/post-delete.component';
import {RoleGuard} from './role.guard';
import {UserSavedComponent} from './components/user/user-saved/user-saved.component';


const routes: Routes = [
  {path: '', component: PostListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'help', component: HelpComponent},
  {
    path: 'post', children: [
      {path: 'new', component: PostNewComponent, canActivate: [AuthGuard]},
      {
        path: ':id', children: [
          {path: '', component: PostDetailsComponent},
          {path: 'edit', component: PostEditComponent, canActivate: [AuthGuard, RoleGuard]},
          {path: 'delete', component: PostDeleteComponent, canActivate: [AuthGuard, RoleGuard]}
        ]
      },
    ]
  },
  {
    path: 'user', children: [
      {path: '', component: UserDetailsComponent, canActivate: [AuthGuard]},
      {path: 'saved', component: UserSavedComponent, canActivate: [AuthGuard]},
      {path: 'edit', component: UserEditComponent, canActivate: [AuthGuard]},
      {path: 'delete', component: UserDeleteComponent, canActivate: [AuthGuard]},
      {path: ':id', component: UserDetailsComponent}
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
