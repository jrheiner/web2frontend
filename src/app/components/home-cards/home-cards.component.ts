import {Component, OnInit} from '@angular/core';
import {TokenService} from '../../services/token.service';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-home-cards',
  templateUrl: './home-cards.component.html',
  styleUrls: ['./home-cards.component.scss']
})
export class HomeCardsComponent implements OnInit {

  constructor(private session: TokenService, private apiService: ApiService) {
  }

  projectData = {
    disk_assets: {
      storageSize: 0
    },
    disk_avatars: {
      storageSize: 0
    },
    db: {
      storageSize: 0
    },
    user: {
      count: 0
    },
    post: {
      count: 0
    },
    comment: {
      count: 0
    },
    vote: {
      count: 0
    },
    image: {
      count: 0
    }
  };
  loading = true;
  error = false;

  ngOnInit(): void {
    this.getProjectData();
  }

  getProjectData(): void {
    this.apiService.getProjectStats().subscribe((data) => {
      this.projectData = data;
      this.loading = false;
    }, () => {
      this.error = true;
      this.loading = false;
    });
  }

  isLoggedIn(): boolean {
    return this.session.isLoggedIn();
  }


  convertBytes(bytes): string {
    const sizes = ['bytes', 'kb', 'mb', 'gb', 'tb'];
    if (bytes === 0) {
      return '0 KB';
    }
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    if (i === 0) {
      return bytes + ' ' + sizes[i];
    }
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
  }

}
