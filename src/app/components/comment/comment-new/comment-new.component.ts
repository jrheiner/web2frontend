import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../core/services/api.service';
import {ActivatedRoute} from '@angular/router';
import {TokenService} from '../../../core/services/token.service';

@Component({
  selector: 'app-comment-new',
  templateUrl: './comment-new.component.html',
  styleUrls: ['./comment-new.component.scss']
})
export class CommentNewComponent implements OnInit {

  private id = this.route.snapshot.paramMap.get('id');
  sending = false;
  writeComment = '';
  error = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private session: TokenService) {
  }

  ngOnInit(): void {
  }

  postComment(): void {
    if (this.writeComment === '') {
      return;
    }
    this.sending = true;
    const comment = {
      description: this.writeComment
    };
    this.apiService.postComment(this.id, comment).subscribe(res => {
      this.session.newComment.emit();
      this.sending = false;
      this.writeComment = '';
      this.error = false;
    }, () => {
      this.sending = false;
      this.error = true;
    });
  }

  isLoggedIn(): boolean {
    return this.session.isLoggedIn();
  }
}
