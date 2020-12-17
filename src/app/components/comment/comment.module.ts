import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommentListComponent} from './comment-list/comment-list.component';
import {CommentNewComponent} from './comment-new/comment-new.component';
import {SharedModule} from '@shared/shared.module';


@NgModule({
  declarations: [
    CommentListComponent,
    CommentNewComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CommentListComponent,
    CommentNewComponent
  ]
})
export class CommentModule {
}
