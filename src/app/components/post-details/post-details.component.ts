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
    score: '',
    createdAt: '',
    updatedAt: ''
  };
  comments;
  notFound: string;
  copyLink: string;
  postIsSaved = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private session: TokenService, private router: Router) {
  }

  ngOnInit(): void {
    this.apiService.getPostById(this.id).subscribe((post) => {
      this.post = post;
      this.post.description = this.post.description.replace(/\\n/g, String.fromCharCode(13, 10));
      this.apiService.getComments(this.id).subscribe((comments) => {
        this.comments = comments;
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
      this.notFound = error.error.message;
    });
  }

  getUsername(): string {
    return this.session.getUsername();
  }


  copyShareLink(): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = window.location.href; // TODO this doesn't work in production i think
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
}
