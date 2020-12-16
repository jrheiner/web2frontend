import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PostDeleteComponent} from './post-delete/post-delete.component';
import {PostDetailsComponent} from './post-details/post-details.component';
import {PostEditComponent} from './post-edit/post-edit.component';
import {PostNewComponent} from './post-new/post-new.component';
import {CommentModule} from '../comment/comment.module';
import {SharedModule} from '../../shared/shared.module';


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
    SharedModule
  ]
})
export class PostModule {
}
