import {Component, OnInit} from '@angular/core';
import {ApiService} from '@core/services/api.service';
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
    type: '',
    link: '',
    createdAt: '',
    updatedAt: ''
  };
  comments;
  info = {
    type: '',
    message: ''
  };
  componentLoading = true;
  working = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.apiService.getPostById(this.id).subscribe((post) => {
      this.post = post;
      this.componentLoading = false;
      setTimeout(() => {
        const textarea = document.getElementById('description') as HTMLTextAreaElement;
        textarea.style.height = '';
        textarea.style.height = textarea.scrollHeight + 3 + 'px';
      }, 0);
    }, error => {
      console.log(error);
      this.componentLoading = false;
    });
  }

  onSubmit(): void {
    this.updatePost();
  }

  private updatePost(): void {
    this.working = true;
    const reqData = {
      title: this.post.title,
      description: this.post.description,
      link: undefined
    };
    if (this.post.type === 'link' && this.post.link !== '') {
      reqData.link = this.post.link;
    }
    this.apiService.editPostById(this.id, reqData).subscribe(res => {
      console.log(res);
      this.router.navigate(['/post/' + res.id]);
      this.working = false;
    }, err => {
      console.log(err);
      this.info.type = 'danger';
      this.info.message = 'Something went wrong. Try again.';
      this.working = false;
    });
  }

  cancel(): void {
    this.router.navigate(['/post/' + this.id]);
  }
}
