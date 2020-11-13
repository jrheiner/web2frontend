import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostListComponent} from './components/post-list/post-list.component';
import {PostDetailsComponent} from './components/post-details/post-details.component';
import {PostNewComponent} from './components/post-new/post-new.component';
import {PostEditComponent} from './components/post-edit/post-edit.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {UserDetailsComponent} from './components/user-details/user-details.component';
import {AuthGuard} from './auth.guard';
import {UserEditComponent} from './components/user-edit/user-edit.component';
import {UserDeleteComponent} from './components/user-delete/user-delete.component';
import {HelpComponent} from './components/help/help.component';
import {PostDeleteComponent} from './components/post-delete/post-delete.component';
import {RoleGuard} from './role.guard';


const routes: Routes = [
  {path: '', component: PostListComponent},
  {path: 'post/new', component: PostNewComponent, canActivate: [AuthGuard]},
  {path: 'post/:id', component: PostDetailsComponent},
  {path: 'post/:id/edit', component: PostEditComponent, canActivate: [AuthGuard, RoleGuard]},
  {path: 'post/:id/delete', component: PostDeleteComponent, canActivate: [AuthGuard, RoleGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'help', component: HelpComponent},
  {path: 'user', component: UserDetailsComponent, canActivate: [AuthGuard]},
  {path: 'user/edit', component: UserEditComponent, canActivate: [AuthGuard]},
  {path: 'user/delete', component: UserDeleteComponent, canActivate: [AuthGuard]},
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
