import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommentListComponent} from './comment-list/comment-list.component';
import {CommentNewComponent} from './comment-new/comment-new.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';


@NgModule({
  declarations: [
    CommentListComponent,
    CommentNewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    BrowserModule
  ],
  exports: [
    CommentListComponent,
    CommentNewComponent
  ]
})
export class CommentModule {
}
