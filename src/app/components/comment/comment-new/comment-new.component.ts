import {Component, OnInit} from '@angular/core';
import {ApiService} from '@core/services/api.service';
import {ActivatedRoute} from '@angular/router';
import {TokenService} from '@core/services/token.service';

/**
 * New comment component, contains form to write and post a comment
 */
@Component({
  selector: 'app-comment-new',
  templateUrl: './comment-new.component.html',
  styleUrls: ['./comment-new.component.scss']
})
export class CommentNewComponent implements OnInit {
  /**
   * Get post id from url
   * @private
   */
  private id = this.route.snapshot.paramMap.get('id');
  /**
   * Flag if a comment post request is in progress
   */
  sending = false;
  /**
   * Variable for binding to the form
   */
  writeComment = '';
  /**
   * Flag to display Server error div
   */
  error = false;

  /**
   * Constructor
   * @param apiService - ApiService to make API calls
   * @param route - ActivatedRoute to get URL parameter
   * @param session - TokenService to get information about the session state and user
   */
  constructor(private apiService: ApiService, private route: ActivatedRoute, private session: TokenService) {
  }

  /**
   * No initialization needed
   */
  ngOnInit(): void {
  }

  /**
   * Comment that prepares and makes the API call to post a new comment
   */
  postComment(): void {
    if (this.writeComment === '') {
      return;
    }
    this.sending = true;
    const comment = {
      description: this.writeComment
    };
    this.apiService.postComment(this.id, comment).subscribe(() => {
      this.session.newComment.emit();
      this.sending = false;
      this.writeComment = '';
      this.error = false;
    }, () => {
      this.sending = false;
      this.error = true;
    });
  }

  /**
   * Wrapper function if the user is logged in
   */
  isLoggedIn(): boolean {
    return this.session.isLoggedIn();
  }
}
