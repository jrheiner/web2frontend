import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TokenService} from '../../services/token.service';
import {ApiService} from '../../services/api.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private session: TokenService, private apiService: ApiService) {
  }

  private id = this.route.snapshot.paramMap.get('id');
  comments = [{
    id: '',
    parent: '',
    description: '',
    createdAt: '',
    updatedAt: '',
    author: {
      _id: '',
      username: ''
    }
  }];
  updateComment = '';
  componentLoading = true;
  private serviceSubscription: Subscription;


  private static commentsAllow(allowed: boolean): void {
    const buttons = document.getElementsByClassName('btn-edit-comment') as HTMLCollectionOf<HTMLButtonElement>;
    // @ts-ignore
    for (const btn of buttons) {
      btn.disabled = !allowed;
    }
  }

  private static enableCommentEditing(id: string): void {
    const btnGroup = document.getElementById('btn-group-' + id);
    const btnEditGroup = document.getElementById('btn-edit-group-' + id);
    const commentDisplay = document.getElementById('comment-display-' + id);
    const commentEdit = document.getElementById('comment-edit-' + id);
    const EditArea = document.getElementById('edit-area-' + id);

    btnGroup.className = 'btn-group';
    btnEditGroup.className = 'btn-group  d-none';
    commentDisplay.className = '';
    commentEdit.className = 'd-none';
    EditArea.className = 'form-control d-none';
  }

  ngOnInit(): void {
    this.updateComments();
    this.serviceSubscription = this.session.newComment.subscribe(() => {
      this.updateComments();
    });
  }

  ngOnDestroy(): void {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
  }

  private updateComments(): void {
    this.apiService.getComments(this.id).subscribe((comments) => {
      this.comments = comments.reverse();
      this.componentLoading = false;
    }, error => {
      console.log(error);
      this.componentLoading = false;
    });
  }

  getUsername(): string {
    return this.session.getUsername();
  }

  isLoggedIn(): boolean {
    return this.session.isLoggedIn();
  }

  deleteComment(id: string): void {
    const comment = document.getElementById(id);
    const deleteBtn = document.getElementById('btn-delete-' + id) as HTMLButtonElement;
    const editBtn = document.getElementById('btn-edit-' + id) as HTMLButtonElement;
    comment.className += ' border-danger text-muted';
    deleteBtn.disabled = true;
    editBtn.disabled = true;
    this.apiService.deleteCommentById(id).subscribe(() => {
      setTimeout(() => {
        this.updateComments();
      }, 300);
    }, error => {
      console.log(error);
    });
  }

  startCommentEdit(id: string): void {
    CommentListComponent.commentsAllow(false);
    const btnGroup = document.getElementById('btn-group-' + id);
    const btnEditGroup = document.getElementById('btn-edit-group-' + id);
    const commentDisplay = document.getElementById('comment-display-' + id);
    const commentEdit = document.getElementById('comment-edit-' + id);
    const EditArea = document.getElementById('edit-area-' + id) as HTMLTextAreaElement;

    EditArea.value = this.getCommentText(id);
    btnGroup.className = 'btn-group d-none';
    btnEditGroup.className = 'btn-group';
    commentDisplay.className = 'd-none';
    commentEdit.className = '';
    EditArea.className = 'form-control';
    EditArea.style.height = '';
    EditArea.style.height = EditArea.scrollHeight + 3 + 'px';
  }

  finishCommentEdit(id: string): void {
    CommentListComponent.commentsAllow(true);
    CommentListComponent.enableCommentEditing(id);
    const commentDescription = document.getElementById('comment-desc-' + id);
    if (this.updateComment !== '') {
      this.apiService.editCommentById(id, {description: this.updateComment}).subscribe((res) => {
        commentDescription.innerText = res.description;
        this.updateComments();
      }, error => {
        console.log(error);
      });
    }
  }

  cancelCommentEdit(id: string): void {
    CommentListComponent.commentsAllow(true);
    CommentListComponent.enableCommentEditing(id);
    this.updateComment = '';
  }

  private getCommentText(id: string): string {
    const foundComment = this.comments.find(element => element.id === id);
    return foundComment ? foundComment.description : '';
  }

}
