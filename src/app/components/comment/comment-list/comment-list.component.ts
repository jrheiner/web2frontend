import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TokenService} from '@core/services/token.service';
import {ApiService} from '@core/services/api.service';
import {Subscription} from 'rxjs';

/**
 * Comment list component, displays all comments for a specific post
 */

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit, OnDestroy {

  /**
   * Comment list constructor
   * @param route - ActivatedRoute to get url parameter
   * @param session - TokenService for session calls
   * @param apiService - ApiService to make requests to the api
   */
  constructor(private route: ActivatedRoute, private session: TokenService, private apiService: ApiService) {
  }

  /**
   * Get post id from url
   */
  private id = this.route.snapshot.paramMap.get('id');
  /**
   * Define comments array which will hold all comments after the api requst
   */
  comments = [{
    id: '',
    parent: '',
    description: '',
    createdAt: '',
    updatedAt: '',
    createdAtUnix: '',
    updatedAtUnix: '',
    author: {
      _id: '',
      username: '',
      avatar: ''
    }
  }];
  /**
   * Variable for the comment editing mode bind
   */
  updateComment = '';
  /**
   * Flag to signal when the component has finished loading
   */
  componentLoading = true;
  /**
   * Event Subscription for new comment event
   * @private
   */
  private serviceSubscription: Subscription;
  /**
   * Flag to display Server error div
   */
  error = false;

  /**
   * Set disabled state for the comment edit button
   * @param {boolean} allowed - If button is enabled or disabled
   * @private
   */
  private static commentsAllow(allowed: boolean): void {
    const buttons = document.getElementsByClassName('btn-edit-comment') as HTMLCollectionOf<HTMLButtonElement>;
    // @ts-ignore
    for (const btn of buttons) {
      btn.disabled = !allowed;
    }
  }

  /**
   * Enable comment editing mode for a specific comment
   * @param {string} id - Comment id
   * @private
   */
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

  /**
   * Initialization by getting all comments
   * and setting up an Event Subscription to refresh if a new comment is posted
   */
  ngOnInit(): void {
    this.updateComments();
    this.serviceSubscription = this.session.newComment.subscribe(() => {
      this.updateComments();
    });
  }

  /**
   * Unsubscribe from new comment event to avoid duplicate subscriptions
   */
  ngOnDestroy(): void {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
  }

  /**
   * Gets all comments from api
   * @private
   */
  private updateComments(): void {
    this.apiService.getComments(this.id).subscribe((comments) => {
      this.comments = comments.reverse();
      this.componentLoading = false;
    }, () => {
      this.error = true;
      this.componentLoading = false;
    });
  }

  /**
   * Wrapper function to get session username
   */
  getUsername(): string {
    return this.session.getUsername();
  }

  /**
   * Wrapper function to get session login state
   */
  isLoggedIn(): boolean {
    return this.session.isLoggedIn();
  }

  /**
   * Delete a comment by id
   * @param {string} id - Comment id to delete
   */
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

  /**
   * Start editing mode for a specific comment
   * @description Hides the comment text and displays a textarea field
   * @param {string} id - Comment id
   */
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

  /**
   * Finish comment editing mode and send the update request
   * @param {string} id - Comment id
   */
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

  /**
   * Cancel comment editing mode and go back without changes
   * @param {string} id - Comment id
   */
  cancelCommentEdit(id: string): void {
    CommentListComponent.commentsAllow(true);
    CommentListComponent.enableCommentEditing(id);
    this.updateComment = '';
  }

  /**
   * Get comment description by comment id
   * @param {string} id - Comment id
   * @private
   */
  private getCommentText(id: string): string {
    const foundComment = this.comments.find(element => element.id === id);
    return foundComment ? foundComment.description : '';
  }

}
