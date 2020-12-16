import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PostDeleteComponent} from './post-delete/post-delete.component';
import {PostDetailsComponent} from './post-details/post-details.component';
import {PostEditComponent} from './post-edit/post-edit.component';
import {PostNewComponent} from './post-new/post-new.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CommentModule} from '../comment/comment.module';


@NgModule({
  declarations: [
    PostDeleteComponent,
    PostDetailsComponent,
    PostEditComponent,
    PostNewComponent
  ],
  imports: [
    CommonModule,
    CommentModule,
    BrowserModule,
    FormsModule,
    RouterModule
  ]
})
export class PostModule {
}
