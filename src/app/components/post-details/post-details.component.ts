import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute} from '@angular/router';
import {TokenService} from '../../services/token.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  constructor(private apiService: ApiService, private route: ActivatedRoute, private session: TokenService) {
  }

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
    type: '',
    images: [],
    link: '',
    createdAt: '',
    updatedAt: ''
  };
  notFound: string;
  copyLink: string;
  postIsSaved = false;
  isLoading = false;
  componentLoading = true;

  ngOnInit(): void {
    this.updatePostDetails();
  }

  private updatePostDetails(): void {
    this.apiService.getPostById(this.id).subscribe((post) => {
      this.post = post;
      this.post.description = this.post.description.replace(/\\n/g, String.fromCharCode(13, 10));
      this.componentLoading = false;
      if (this.post.type === 'link' && this.post.link !== '') {
        if (!this.post.link.includes('http')) {
          this.post.link = 'https://' + this.post.link;
        }
      }
    }, error => {
      console.log(error);
      this.notFound = error.error.message;
      this.componentLoading = false;
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
    selBox.value = window.location.href;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.copyLink = '✓ (Link copied to clipboard)';
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
}
