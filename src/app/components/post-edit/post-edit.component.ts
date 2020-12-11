import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {
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
  info = {
    type: '',
    message: ''
  };
  componentLoading = true;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.apiService.getPostById(this.id).subscribe((post) => {
      this.post = post;
      this.componentLoading = false;
    }, error => {
      console.log(error);
      this.componentLoading = false;
    });
  }

  onSubmit(): void {
    this.updatePost();
  }

  private updatePost(): void {
    const reqData = {
      title: this.post.title,
      description: this.post.description,
    };
    this.apiService.editPostById(this.id, reqData).subscribe(res => {
      console.log(res);
      this.info.type = 'success';
      this.info.message = 'Post updated successfully.';
    }, err => {
      console.log(err);
      this.info.type = 'danger';
      this.info.message = 'Something went wrong. Try again.';
    });
  }

  cancel(): void {
    this.router.navigate(['/post/' + this.id]);
  }
}
