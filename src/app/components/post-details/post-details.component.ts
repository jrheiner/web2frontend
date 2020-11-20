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

  private id = this.route.snapshot.paramMap.get('id');
  post = {
    id: String,
    author: {
      _id: String,
      username: String
    },
    title: String,
    description: String,
    score: Number,
    createdAt: String,
    updatedAt: String
  };
  comments;
  notFound: string;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private session: TokenService) {
  }

  ngOnInit(): void {
    this.apiService.getPostById(this.id).subscribe((post) => {
      this.post = post;
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
}
