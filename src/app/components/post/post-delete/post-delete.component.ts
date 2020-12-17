import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '@core/services/api.service';

@Component({
  selector: 'app-post-delete',
  templateUrl: './post-delete.component.html',
  styleUrls: ['./post-delete.component.scss']
})
export class PostDeleteComponent implements OnInit {

  private id = this.route.snapshot.paramMap.get('id');
  working = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
  }

  delete(): void {
    this.working = true;
    this.apiService.deletePostById(this.id).subscribe(() => {
      // noinspection JSIgnoredPromiseFromCall
      this.router.navigate(['/']);
    });

  }

  cancel(): void {
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['/post/' + this.id]);
  }
}
