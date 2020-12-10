import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenService} from '../../services/token.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  private id = this.route.snapshot.paramMap.get('id');
  post = {
    id: '',
    author: {
      _id: '',
      username: ''
    },
    title: '',
    description: '',
    score: 0,
    createdAt: '',
    updatedAt: ''
  };
  comments;
  notFound: string;
  copyLink: string;
  postIsSaved = false;
  isLoading = false;
  sending = false;
  writeComment = '';
  componentLoading = true;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private session: TokenService, private router: Router) {
  }

  ngOnInit(): void {
    this.updatePostDetails();
  }

  private updatePostDetails(): void {
    this.apiService.getPostById(this.id).subscribe((post) => {
      this.post = post;
      this.post.description = this.post.description.replace(/\\n/g, String.fromCharCode(13, 10));
      this.updateComments();
    }, error => {
      console.log(error);
      this.notFound = error.error.message;
    });
  }

  private updateComments(): void {
    this.apiService.getComments(this.id).subscribe((comments) => {
      this.comments = comments.reverse();
      this.componentLoading = false;
    }, error => {
      console.log(error);
    });
  }

  getUsername(): string {
    return this.session.getUsername();
  }

  isLoggedIn(): boolean {
    return this.session.isLoggedIn();
  }


  copyShareLink(): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = window.location.href; // TODO link doesn't work in production i think
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.copyLink = 'Link copied to clipboard';
  }

  savePost(currentValue: boolean): void {
    // TODO save post to user list idk
    // do request
    this.postIsSaved = !currentValue;
  }

  likePost(): void {
    this.isLoading = true;
    this.apiService.likePost(this.post.id).subscribe(res => {
      if (res.hasOwnProperty('success') && res.success) {
        this.post.score++;
        this.isLoading = false;
      } else if (res.hasOwnProperty('success') && !res.success) {
        this.apiService.removeLikePost(this.post.id).subscribe(() => {
          this.post.score--;
          this.isLoading = false;
        });
      }
    }, error => {
      this.isLoading = false;
      console.log(error);
    });

  }

  postComment(): void {
    if (this.writeComment === '') {
      return;
    }
    this.sending = true;
    const comment = {
      description: this.writeComment
    };
    this.apiService.postComment(this.post.id, comment).subscribe(res => {
      this.updateComments();
      this.sending = false;
      this.writeComment = '';
    }, error => {
      this.sending = false;
      console.log(error);
    });
  }

  deleteComment(id: string): void {
    const comment = document.getElementById(id);
    const btn = document.getElementById('btn-delete-' + id) as HTMLButtonElement;
    comment.className += ' border-danger text-muted';
    btn.disabled = true;
    this.apiService.deleteCommentById(id).subscribe(() => {
      setTimeout(() => {
        this.updateComments();
      }, 300);
    }, error => {
      console.log(error);
    });
  }

}
